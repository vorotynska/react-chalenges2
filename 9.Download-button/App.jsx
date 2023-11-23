import React from "react"
import Header from "./components/Header"
import File from "./components/File"
import Footer from "./components/Footer"
import generateMessage from "./utilities/generateMessage"
import {nanoid} from "nanoid"
import {detect} from "detect-browser"

export default function App() {
		
	const [userData, setUserData] = React.useState({
		userId: nanoid(),
		downloadRequested: false,
		downloadTimeStamp: undefined,
		requestedFileId: undefined, 
		browser: undefined,
		location: {ip: undefined, city: undefined, country: undefined}
	})
	
	if (userData.downloadRequested) {
		generateMessage(userData)
	}
	
	React.useEffect(()=>{
		if (userData.downloadRequested) {
			throw Error("The userID changed :-(")
		}
	}, [userData.userId])


/* Challenge

	The download page for this file needs a download button! Your task is to create one as follows: 
      
      	1. When the user clicks the "Download" button on line 82 below, the button should become 
		   disabled, and the userData state should be updated as follows: 
		   
           	        Property		 	  Value(s)					  
			     ╷---------------------╷-----------------------------------------------------------╷
			 x   |  userId             |  preserve the userId value of the previous userData state |
			     |---------------------|-----------------------------------------------------------|
		  	 x   |  downloadRequested  |  true                               					   |
			     |---------------------|-----------------------------------------------------------|
			 x   |  downloadTimeStamp  |  new Date().toLocaleString()                              |
			     |---------------------|-----------------------------------------------------------|
			 x	 |  requestedFileId    |  the file ID stored as data in the download button        |
                 |---------------------|-----------------------------------------------------------|
			 x   |  browser            |  detect()							                 	   |
                 |---------------------|-----------------------------------------------------------|
			 x   |  location  		   |  an object with the following properties:			       |
			     |					   |     - ip: the user's IP address					       |
				 |					   |	 - city: the user's city name						   |
				 |					   |	 - country: the name of the user's country			   |
                 |                     |       													   |
			     ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯
	
	 	2. Aside from the above, nothing needs to be changed or added anywhere else in the code. If 
		   you complete these tasks successfully, you should see a correctly rendered message in the console, and the button should become faded and unclickable after you click it. 
*/

	function handleClick(event) {
		
		fetch("https://ipapi.co/json/")
		.then(res => res.json())
		.then(data => 		
			setUserData(prevUserData =>{
				return (
					{
						userId: prevUserData.userId,
						downloadRequested: true,
						downloadTimeStamp: new Date().toLocaleString(),
						requestedFileId: event.target.dataset.fileId,
						browser: detect(),
						location: {
							ip: data.ip,
							city: data.city,
							country: data.country_name
						}
						
					}
				)
			}) 
		)
		
	}
	
	return (
		<div>
			<Header />
			<main>
				<File />
				<div>
				
					<button 
						className="download-button" 
						data-file-id={nanoid()}
						disabled={userData.downloadRequested}
						onClick={handleClick}
					>
						Download
					</button>

				</div>
			</main>
			<Footer />
		</div>
	)
}
