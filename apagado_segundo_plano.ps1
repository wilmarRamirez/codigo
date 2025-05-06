Add-Type -AssemblyName Microsoft.VisualBasic

# Mostrar cuadro de entrada
$horaInput = [Microsoft.VisualBasic.Interaction]::InputBox(
    "¿Hasta qué hora trabajas hoy? (Ejemplo: 18:30)", 
    "Programar Apagado",
    "18:00"
)

if (-not $horaInput) {
    exit
}

try {
    $horaApagado = [datetime]::ParseExact($horaInput, "HH:mm", $null)
    $ahora = Get-Date
    $apagadoHoy = Get-Date -Hour $horaApagado.Hour -Minute $horaApagado.Minute -Second 0

    if ($apagadoHoy -lt $ahora) {
        [System.Windows.Forms.MessageBox]::Show("Esa hora ya pasó. Intenta de nuevo.", "Error", 0, 48)
        exit
    }

    $horaStr = $apagadoHoy.ToString("HH:mm")
    $fechaStr = $apagadoHoy.ToString("dd/MM/yyyy")
    $nombreTarea = "ApagarPC_" + $apagadoHoy.ToString("HHmm")

    # Crear la tarea programada
    schtasks /create /tn $nombreTarea /tr "shutdown /s /f /t 0" /sc once /st $horaStr /sd $fechaStr /ru "SYSTEM"

    [System.Windows.Forms.MessageBox]::Show("El sistema se apagará a las $horaStr.", "Apagado Programado", 0, 64)
}
catch {
    [System.Windows.Forms.MessageBox]::Show("Formato inválido. Usa HH:mm (Ej: 17:45)", "Error", 0, 48)
}
