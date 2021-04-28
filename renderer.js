
function giveReward(title, desc) {
	const myNotification = new Notification(title, {
		body: desc
	})
}

//const myNotification = new Notification('Title', {
//	body: 'Notification from the Renderer process'
//})

//myNotification.onclick = () => {
//	console.log('Notification clicked')
//}