import * as constantValue from '../constants/constants'


export function timeConverter(UNIX_timestamp: number, timezoneOffset: number) {

    const months = constantValue.months
    const days = constantValue.days

    var fullDate: Date = new Date(UNIX_timestamp * 1000)

    var timezoneOffset2: number = fullDate.getTimezoneOffset() * 60
    var adjustedTimestamp: number = UNIX_timestamp + timezoneOffset + timezoneOffset2
    var adjustedDate: Date = new Date(adjustedTimestamp * 1000)

    var hour: string = adjustedDate.getHours() < 10 ? '0' + adjustedDate.getHours().toString() : adjustedDate.getHours().toString()
    var min: string = adjustedDate.getMinutes() < 10 ? '0' + adjustedDate.getMinutes().toString() : adjustedDate.getMinutes().toString()
    //const seconds = adjustedDate.getSeconds()

    //var year = fullDate.getFullYear()
    var month: string = months[adjustedDate.getMonth()]
    var date: string = adjustedDate.getDate().toString()
    var day: string = days[adjustedDate.getDay()]
    //var hour = fullDate.getHours() < 10 ? '0' + fullDate.getHours() : fullDate.getHours()
    //var min = fullDate.getMinutes() < 10 ? '0' + fullDate.getMinutes() : fullDate.getMinutes()
    //var sec = fullDate.getSeconds()
    const dateTime: string = date + ' ' + month + ', ' + day + ' ' + hour + ':' + min
    var month2 = (adjustedDate.getMonth() + 1) < 10 ? '0' + (adjustedDate.getMonth() + 1) : (adjustedDate.getMonth() + 1)
    var date2 = adjustedDate.getDate() < 10 ? '0' + adjustedDate.getDate() : adjustedDate.getDate()
    var forecastDataDate: string = adjustedDate.getFullYear() + '-' + month2 + '-' + date2
    console.log(forecastDataDate)
    return {dateTime,forecastDataDate}
}