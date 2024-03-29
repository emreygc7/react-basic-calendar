# @emreygc7/react-basic-calendar



Simple and user-friendly calendar package for your React application. 

 
## Features

- Capture the days, months, and years. 📆
- Assign events to the days. 🎉
- Drag & Drop events 💧
- Dynamic styling. ✨
- Language support. 🌐
- No need for moment.js or day.js. ✖️

## Installation

    npm install @emreygc7/react-basic-calendar

## Usage
First, include the package in your project. Then, call it within the component you want to use.

    import React from React; 
    import Calendar from '@emreygc7/react-basic-calendar'
    
    function Home(){
	    return(
		    <Calendar
		         startingDate={new Date()}
			 onDateClick={(date) => console.log(date)}
		    /> 
	    )
    }


**startingDate**

The value you pass to this prop will set the starting date of the calendar. For example: new Date(2020, 10, 12) //default new Date()


**onDateClick**

This prop captures the date you click on and returns a "date" object. You can find the information about the clicked date in the content of this object and use it as needed.

## User Guide

**Props**

|Prop name|Description|Default Value|Example usage|
|--|--|--|--|
|language| Changes the language of the calendar. Available languages:  "en", "tr", "es", "fr", "de", "it", "pt", "ru". |*"en"*| language={'tr'} |
|startingDate|The value you pass to this prop will set the starting date of the calendar.|new Date()| new Date(2020,10,12)|
|onDateClick|This prop captures the date you click on and returns a "date" object. You can find the information about the clicked date in the content of this object and use it as needed.|n/a| (date) => console.log(date) |
|events|The events prop accepts an array as its content. The objects in the array have three keys: **"date, title, id"**. If the objects in the array you pass to this prop do not have these keys, you need to customize them when passing.|n/a|[{date: '2023-05,20', title: 'Event 1', id: '1'}]|
|onEventClick|This prop captures the event you click on and returns an "event" object. You can find the information about the clicked event in the content of this object and use it as needed.|n/a| (event) => console.log(event) |
|customPrevIcon|The 'customPrevIcon' prop accepts an HTML or JSX element that will be rendered instead of the default prev icon. If you pass an invalid value (such as a string), it will automatically create an element and render the value you passed - which is not recommended|n/a| `<button>Prev</button>` or `<FaPrevIcon />` |
|customNextIcon|The 'customNextIcon' prop accepts an HTML or JSX element that will be rendered instead of the default next icon. If you pass an invalid value (such as a string), it will automatically create an element and render the value you passed - which is not recommended|n/a| `<button>Next</button>` or `<MdNextIcon />` |
|eventIsDraggable|The 'eventIsDraggable' prop determines whether the events assigned to the calendar have the drag-and-drop feature |`false`| `true` |
|onEventDragEnd|The 'onEventDragEnd' prop returns two objects that contain the dragged event and the target date information. `targetDate, event` This allows you to update the date of the event asynchronously or synchronously in the function passed to this prop. |n/a| `(targetDate, event) => console.log("target date: " targetDate, "selected Event: "  event)` |


**Custom Style**

You can completely change the appearance of the calendar using the props provided below. **However, please note that each prop you use will completely override the default style files set for the calendar, rather than adding to them.** Therefore, you are free to create your own style!

|Prop name|
|--|
|mainWrapperClassNames| 
|headWrapperClassNames|
|daysWrapperClassNames|
|daysClassNames|
|calendarBodyClassNames|
|bodyDaysClassNames|
|eventClassNames|

**What's next ?**

 - More language support
 - Built-in dark mode support

### License
MIT License.
