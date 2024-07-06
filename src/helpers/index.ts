export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD' }).format(amount)
}

export function formatDate(dateStr: string) : string {
    // Dividir la cadena de fecha en día, mes y año
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10); // Convertir el día a entero
    const month = parseInt(parts[1], 10) - 1; // Convertir el mes a entero (0-11)
    const year = parseInt(parts[2], 10); // Convertir el año a entero

    // Crear objeto Date con los valores obtenidos
    const dateObj = new Date(year, month, day);

    // Opciones de formato para fecha
    const options : Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}