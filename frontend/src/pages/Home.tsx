
import { Box } from '@mui/material'
import TypingAnimation from '../components/Typer/TypingAnimation'

const Home = () => {
  
  return (
    <Box width={'100%'} height={'100%'}>
      <Box sx={{display: 'flex', width:"%100", flexDirection: "column", alignItems: "center", mx:"auto",mt:3}}>
        <Box>
          <TypingAnimation/>
        </Box>
        <Box sx={{width:'100%', display:"flex",flexDirection:{md:'row',sm:'column',xs:'column'}, gap: 5, my:10}}>
          <img src="gooddrobot.png" alt="robot1"  style={{width:'200px', margin:'auto'}}/>
          <img src="goodrobot.png" alt="robot2"  style={{width:'200px', margin:'auto'}}/>
        </Box>
        <Box sx={{mb:5, fontSize:'22px'}}>Built by <a href="https://github.com/dylankatchen" style={{color:'white', fontSize:'22px'}}>Dylan Katchen</a></Box>
      </Box>
    </Box>
   
  )
}

export default Home

