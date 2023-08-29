import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: Date): string {
    return format(date, 'dd MMM. yyyy', { locale: ptBR });
}

export function addLeadingZero(value: string) {
    if(Number(value) === 0) {
        return '00'
    }
    return Number(value) < 10 && value.charAt(0) !== '0' ? `0${value}` : value.toString();
}

export function stringToDate(month: String) {
    switch (month) {
        case '01' || '1':
            return 'jan';
        case '02' || '2':
            return 'fev';
        case '03' || '3':
            return 'mar';
        case '04' || '4':
            return 'abr';
        case '05' || '5':
            return 'mai';
        case '06' || '6':
            return 'jun';
        case '07' || '7':
            return 'jul';
        case '08' || '8':
            return 'ago';
        case '09' || '9':
            return 'set';
        case '10':
            return 'out';
        case '11':
            return 'nov';
        case '12':
            return 'dez';
        default:
            return '';
    }
}
