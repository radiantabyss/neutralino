export default async function() {
    if ( !IS_PACKAGED ) {
        return;
    }

    let command = `powershell -Command "Get-CimInstance Win32_Process -Filter \"name='${NL_APPID}.exe'\" | Select-Object name"`;
    let result = await Neutralino.os.execCommand(command);
    let regex = new RegExp(`${NL_APPID}\.exe`, 'g');
    let matches = result.stdOut.match(regex);

    if ( matches && matches.length > 1 ) {
        let command = `powershell -Command "
            Add-Type \"
            using System;
            using System.Runtime.InteropServices;

            public class WinApi {
                [DllImport(\"user32.dll\")]
                public static extern bool EnumWindows(EnumWindowsProc enum_proc, IntPtr l_param);

                public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

                [DllImport(\"user32.dll\")]
                public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint process_id);

                [DllImport(\"user32.dll\")]
                public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
            }
            \";
            $process_name = 'ramp.exe';
            $process_list = Get-CimInstance Win32_Process -Filter \"name='$process_name'\";
            if (-not $process_list) {
                Write-Host \"Process '$process_name' not found.\";
                exit;
            }
            $pids = $process_list.ProcessId;
            $found_windows = @();
            $callback = {
                param($hwnd, $lparam)
                [uint32]$window_pid = 0;
                [WinApi]::GetWindowThreadProcessId($hwnd, [ref]$window_pid);
                if ($pids -contains $window_pid) {
                    $script:found_windows += $hwnd;
                }
                return $true;
            };
            [WinApi]::EnumWindows($callback, [IntPtr]::Zero);
            foreach ($hwnd in $found_windows) {
                [WinApi]::ShowWindow($hwnd, 9);
            }
            "`;

        await Neutralino.os.execCommand(command);
        await Neutralino.app.exit();
    }
}
