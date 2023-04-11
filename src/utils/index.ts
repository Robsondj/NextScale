const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ')
}

const getBrDateFormat = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

const getDayOfWeek = (date: string) => {
    const weekDay = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
    const dateUTC = new Date(date);
    const dayOfWeek = dateUTC.getUTCDay();
    return weekDay[dayOfWeek];
}

const getProperty = <T, K extends keyof T>(obj: T, key: K): any => {
    return obj[key];
}

export {
    classNames,
    getBrDateFormat,
    getDayOfWeek,
    getProperty
}