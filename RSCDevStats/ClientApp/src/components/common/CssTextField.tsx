import { TextField, withStyles } from "@material-ui/core"

export default withStyles({
	root: {
		"& label.Mui-focused": {
			color: "#d0d2d6",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#d0d2d6",
		},
		"& .MuiInput-underline:before": {
			borderBottomColor: "#d0d2d6",
		},
		"& .MuiInput-underline:hover": {
			borderBottomColor: "#d0d2d6",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#d0d2d6",
			},
			"&:hover fieldset": {
				borderColor: "#d0d2d6",
			},
			"&.Mui-focused fieldset": {
				borderColor: "#d0d2d6",
			},
		},
	},
})(TextField)
