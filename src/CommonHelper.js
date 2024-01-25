export default class CommonHelper {
    getDay = (day) => {
        switch(day) {
            case 0: return 'SUNDAY';
            case 1: return 'MONDAY';
            case 2: return 'TUESDAY';
            case 3: return 'WEDNESDAY';
            case 4: return 'THURSDAY';
            case 5: return 'FRIDAY';
            case 6: return 'SATURDAY';
            default: return '';
        }
    }

    getDate = (day, month, year) => {
        let monthString = '';
        switch(month) {
            case 0: monthString = 'January';
                break;
            case 1: monthString = 'FEBRUARY';
                break;
            case 2: monthString = 'MARCH';
                break;
            case 3: monthString = 'APRIL';
                break;
            case 4: monthString = 'MAY';
                break;
            case 5: monthString = 'JUNE';
                break;
            case 6: monthString = 'JULY';
                break;
            case 7: monthString = 'AUGUST';
                break;
            case 8: monthString = 'SEPTEMBER';
                break;
            case 9: monthString = 'OCTOBER';
                break;
            case 10: monthString = 'NOVEMBER';
                break;
            case 11: monthString = 'DECEMBER';
                break;
            default:
                break;
        }

        return `${day} ${monthString} ${year}`;
    }

    getTime = (second, minute, hour) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    }
}