import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container";

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))

export const MainContainer = ({ children, ...props }) => {
    const styles = useStyle()

    return (
        <Container
            className={styles.root}
            component="main"
            maxWidth="xs"
            {...props}
        >
            {children}
        </Container>
    )
}