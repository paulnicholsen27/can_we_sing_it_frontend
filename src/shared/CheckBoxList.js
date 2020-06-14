import React, {useState, useEffect} from 'react'
import { Button, List, Container, Header } from 'semantic-ui-react'
import CheckBoxListItem from "./CheckBoxListItem.js"

let CheckBoxList = (props) => {
    let [attendeeIds, changeAttendeeIds] = useState(Object.fromEntries(
                props.gig.attendance.map(e => [e.singer.id, e.attending])))

    let updateAttendance = records => {
        changeAttendeeIds(
            Object.fromEntries(
                records.map(e => [e.singer.id, e.attending])))
        }

    useEffect(() => {
        updateAttendance(props.gig.attendance)
    }, [props.gig])

    let saveAttendance = () => { 
        let singer_ids = Object.keys(attendeeIds)
        singer_ids = singer_ids.filter((id) => attendeeIds[id]) 
        // only people attending this gig
        let data = {singer_ids: singer_ids}
        fetch(`http://localhost:3001/gigs/${props.gig.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(r => r.json())
        .then(
            gig => {
                props.changeGig(
                    currentGig => {
                        currentGig.attendance = gig.attendance
                        return currentGig})
            }
        )
    }

    let toggleCheckBox = id => {
        changeAttendeeIds(
            {...attendeeIds,
             [id]: !attendeeIds[id]
            }
        )
    }

    const attendanceLis = props.gig.attendance.map((record) => {
        return ( <CheckBoxListItem
            onChange={toggleCheckBox}
            checked={attendeeIds[record.singer.id]} 
            key={record.singer.id}
            label={record.singer.name}
            record={record}/> )
    })

    return (
            
        <Container>   
            <Header as="h4">Attendance:</Header>
            <List>{attendanceLis}</List>
            <Button onClick={() => saveAttendance(attendeeIds)}>Save Changes</Button>
        </Container>
    )


}

export default CheckBoxList