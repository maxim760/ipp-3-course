import React, { useState } from 'react';
import {Container, Typography, Button, Box, TextField, CircularProgress, Grid, Card, CardHeader, CardContent, Avatar, CardMedia} from "@mui/material"
import { steamApi } from './api/api';
import { IAppInfo, ITotalInfo } from './api/types';

function App() {
  const [isLoadUsers, setLoadUsers] = useState(false)
  const [isLoadApps, setLoadApps] = useState(false)
  const [query, setQuery] = useState("")
  const [userInfo, setUserInfo] = useState<null | ITotalInfo>(null)
  const [apps, setApps] = useState<IAppInfo[]>([])
  const onClickLoadUsers = async () => {
    setLoadUsers(true)
    try {
      const res = await steamApi.getTotalInfo()
      setUserInfo(res)
    } catch (error) { 
    } finally {
      setLoadUsers(false)
    }
  }
  const onClickSearch = async () => {
    setLoadApps(true)
    try {
      const res = await steamApi.getAppsFromQuery(query)
      setApps(res)
    } catch (error) {
      
    } finally {
      setLoadApps(false)
    }
  }
  return (
    <Container sx={{display: "flex", flexDirection: "column"}}>
      <Typography sx={{ fontSize: "32px", mb: 3, textAlign: "center" }}>api стим</Typography>
      <Box sx={{display: "flex"}}>
        <Button sx={{width: "400px"}} variant="contained" onClick={onClickLoadUsers}>{!isLoadUsers ? "Получить информацию по пользователям" : <CircularProgress size={24} color="inherit" />}</Button>
        {userInfo && <Box sx={{ml: 5}}>
          <Typography>в игре: {userInfo.users_ingame}</Typography>
          <Typography>онлайн: {userInfo.users_online}</Typography>
        </Box>}
      </Box>
      <Box sx={{ mt: 4, }}>
        Символов больше 3
        <Box sx={{display: "flex", mt: 2}}>
          <TextField placeholder="Введите" label="Название приложения" type="search" autoComplete='off' fullWidth value={query} onChange={(e) => setQuery(e.target.value)}  />
          <Button sx={{width: "150px"}}  onClick={onClickSearch} disabled={query.length <= 3} variant="contained">
            {!isLoadApps ? "Поиск" : <CircularProgress size={24} color="inherit" />}
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {apps.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.appid}>
            <Card>
              <CardHeader
                avatar={<Avatar src={item.icon}>{item.name[0]}</Avatar>}
                title={item.name}
              />
              <CardMedia
                component="img"
                height="194"
                image={item.logo}
                alt=""
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
