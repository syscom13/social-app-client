import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

export default ({ children, onClick, tip, btnClassname, tipClassname}) => {
  return (
    <Tooltip title={tip} className={tipClassname} placement="top">
      <IconButton onClick={onClick} className={btnClassname}>
        {children}
      </IconButton>
    </Tooltip>
  )
}