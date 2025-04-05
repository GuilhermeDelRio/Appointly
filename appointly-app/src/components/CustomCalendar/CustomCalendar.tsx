import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
 
function CustomCalendar() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: 1,
        title: 'Coffee with John',
        start: '2025-04-04 10:00',
        end: '2025-04-04 10:30',
        description: 'Flowers flowers',
        location: 'Online',        
      },
      {
        id: 2,
        title: 'Coffee with John',
        start: '2025-04-04 10:30',
        end: '2025-04-04 11:00',
        location: 'Online',
      },
    ],
    selectedDate: new Date().toISOString().split('T')[0],
    locale: 'pt-BR',
    isDark: false,
    weekOptions: {
      gridHeight: 3000
    },
    plugins: [
      eventsService,
      // createEventModalPlugin(),
      createDragAndDropPlugin()
    ],
    callbacks: {
      onEventClick(calendarEvent) {
        console.log('onEventClick', calendarEvent)
      }
    }
  })
 
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
 
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
 
export default CustomCalendar