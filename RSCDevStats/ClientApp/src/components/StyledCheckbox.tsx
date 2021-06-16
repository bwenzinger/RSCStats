import { Checkbox, withStyles } from "@material-ui/core"

export default withStyles({
	root: {
		color: "#7267e9",
		"&$checked": {
			color: "#7267e9",
		},
	},
	checked: {},
})(Checkbox)
