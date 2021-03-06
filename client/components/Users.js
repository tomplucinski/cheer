import React from 'react'
import { graphql } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'
import UserPanel from './UserPanel'
import query from '../queries/AllUsers'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  grow: {
    flexGrow: 1,
    display: 'inline-block',
  },
  float: {
    float: 'right',
    display: 'inline-block',
    marginLeft: -12,
    marginRight: 5,
  },
}

function Users(props) {
  const { classes } = props
  const { allUsers } = props.data

  return (
    <div style={{ marginLeft: 150, marginRight: 150 }}>
      <span className={classes.root}>
        <h3 className={classes.grow}>Users</h3>
        <Link to="/createUser">
          <Button className={classes.float}>Add User</Button>
        </Link>
      </span>
      <br />
      {!allUsers ? (
        <div>loading...</div>
      ) : (
        allUsers.map(user => {
          return <UserPanel key={user.id} user={user} />
        })
      )}
    </div>
  )
}

export default withRouter(withStyles(styles)(graphql(query)(Users)))
