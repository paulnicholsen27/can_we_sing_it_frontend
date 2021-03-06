import React, { useState } from 'react'
import { Input, Container, Icon, Header, Grid, Button, Modal } from 'semantic-ui-react'
import CheckBoxList from "shared/CheckBoxList.js"
import CheckBoxListItem from "shared/CheckBoxListItem.js"
import EditGigModal from "./EditGigModal.js"

let GigDetail = (props) => {

    let getDate = () => {
        const options = { year: 'numeric', 
        month: 'long',
        day: 'numeric' };

        let _ = new Date(props.gig.start_time)
        return _.toLocaleDateString(undefined, options)
    }

    if (props.gig) {
        const singerListItems = props.gig.singers.map((record) => {
          return ( <CheckBoxListItem
              onChange={props.toggleAttendance}
              checked={record.attending} 
              key={record.singer.id}
              label={record.singer.name}/> )
      })

        const songListItems = props.gig.songs.map((song) => {
          return ( <CheckBoxListItem
              onChange={props.toggleAttendance}
              checked={true} 
              key={song.id}
              label={song.title}/> )
      })

        return (
            <Container>
                <Header as='h3' dividing>
                    <div>{props.gig.name} - {getDate()}</div>
                    <EditGigModal 
                        gig={props.gig}
                        editGig={props.editGig} />
                </Header>
                <Grid columns={2} divided style={{height: '100vh'}}>
                    <Grid.Column >
                        <CheckBoxList
                            title={"Attendance"}
                            onSave={props.saveAttendance}
                            listItems={singerListItems}/>
                    </Grid.Column>
                    <Grid.Column>
                        <CheckBoxList
                            title={"Set List"}
                            onSave={props.saveAttendance}
                            listItems={songListItems}/>
                    </Grid.Column>
                </Grid>
            </Container>
            )
    } else {
        return <Container>Choose a performance or create a new one</Container>
    }
}

export default GigDetail