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

export function formatDate2(dateStr: string) : string {
    // Dividir la cadena de fecha en día, mes y año
    const parts = dateStr.split('/');
    const month = parseInt(parts[0], 10) - 1; // Convertir el mes a entero (0-11)
    const year = parseInt(parts[1], 10); // Convertir el año a entero

    // Crear objeto Date con los valores obtenidos
    const dateObj = new Date(year, month);

    // Opciones de formato para fecha
    const options : Intl.DateTimeFormatOptions = {
        month: 'long',
        year: 'numeric'
    };

    return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}

export function changeDate(date : string, increment = false) : string {
    const parts = date.split('/');
    const month = parts[0];
    const year = parts[1];

    if(!increment) {
        if(month === "01") {
            const newYear = String(parseInt(year, 10) - 1).padStart(2, '0');
            return `12/${newYear}`
            
        } else {
            const newMonth = String(parseInt(month, 10) - 1).padStart(2, '0');
            return `${newMonth}/${year}`
            
        }
    } else {
        if(month === "12") {
            const newYear = String(parseInt(year, 10) + 1).padStart(2, '0');
            return `01/${newYear}`
            
        } else {
            const newMonth = String(parseInt(month, 10) + 1).padStart(2, '0');
            return `${newMonth}/${year}`
            
        }
    }

}