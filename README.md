# bnp
BusinessNetworkPortal

## Deployment

### Swarm

```
docker service create --name bnp --publish mode=host,target=3000,published=3000 --host consul:172.17.0.1 --env PORT=3000 --log-driver gelf --log-opt gelf-address=udp://10.0.0.12:12201 --log-opt tag="bnp" --env SERVICE_NAME=bnp --env SERVICE_3000_CHECK_HTTP=/ --env SERVICE_3000_CHECK_INTERVAL=15s --env SERVICE_3000_CHECK_TIMEOUT=3s opuscapita/bnp:latest
```
