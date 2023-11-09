export const setInForm = (event, state, setState) => {
    const {name, value} = event.target

    setState({
        ...state,
        [name]: value
    })
}