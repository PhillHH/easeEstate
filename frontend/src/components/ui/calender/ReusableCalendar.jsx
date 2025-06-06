// 📄 src/components/ui/calendar/ReusableCalendar.jsx

import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// 📆 Lokalisierung (de_DE, fallback en_US)
const locales = {
  'de': require('date-fns/locale/de'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const ReusableCalendar = ({ events = [], defaultView = 'week', ...props }) => {
  return (
    <div className="h-[600px] w-full bg-white rounded-xl overflow-hidden">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={defaultView}
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        {...props}
      />
    </div>
  )
}

export default ReusableCalendar
