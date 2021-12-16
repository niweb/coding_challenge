import {ReactElement, useEffect, useState} from "react";
import {StartupHttpService} from "../../Http/Startup/Startup.http.service";
import {Startup} from "../../Types/Startup";
import {Card, Grid, Typography} from "@mui/material";

export default function StartupList(): ReactElement {
  const [startups, setStartups] = useState<Startup[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    StartupHttpService.getStartups().then(data => {
      setStartups(data)
    }).catch(e => {
      setError(e)
    })
  }, [])

  if (error) return <>error</>

  return <Grid id="startup-list" container spacing={2} alignItems={'stretch'}>
    {startups.map(startup => (
        <Grid item xs={4}>
          <Card key={startup.id} sx={{padding: 2}}>
            <Typography variant={'h5'}>{startup.name}</Typography>
            <Typography variant={'subtitle1'} color="text.secondary">
              <span>Founded: {startup.dateFounded.getFullYear()}</span>
              &nbsp;|&nbsp;
              <span>{startup.employees} Employees</span>
              &nbsp;|&nbsp;
              <span>$ {startup.totalFunding} Mio.</span>
              &nbsp;|&nbsp;
              <span>{startup.currentInvestmentStage}</span>
            </Typography>
            <Typography variant={'body1'} sx={{marginY: 2}}>{startup.shortDescription}</Typography>
          </Card>
        </Grid>
      ))}
  </Grid>;
}
