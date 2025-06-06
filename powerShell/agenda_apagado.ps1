Add-Type -AssemblyName Microsoft.VisualBasic

# Mostrar cuadro de entrada
$horaInput = [Microsoft.VisualBasic.Interaction]::InputBox(
    "¿Hasta qué hora trabajas hoy? (Ejemplo: 18:30)", 
    "Programar Apagado",
    "18:00"
)

if (-not $horaInput) {
    # Si el usuario presiona Cancelar o deja vacío
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

    $segundos = [math]::Round(($apagadoHoy - $ahora).TotalSeconds)
    shutdown.exe /s /t $segundos

    [System.Windows.Forms.MessageBox]::Show("El sistema se apagará a las $horaInput (en $($segundos/60) minutos).", "Apagado Programado", 0, 64)
}
catch {
    [System.Windows.Forms.MessageBox]::Show("Formato inválido. Usa HH:mm (Ej: 17:45)", "Error", 0, 48)
}
