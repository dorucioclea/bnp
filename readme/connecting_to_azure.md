#Deployment manager handbook

###Things you will need:

* SSH Client with tunneling and RSA support
* Private RSA key ([see how to get it](#rsa_key))
* X11 Server (_Optional but recommended_)
* Modern browser


##Obtaining SSH private key
For this step you will need assistance of user who is already authorized 
and can access authorization token located in */home/dm/vault_key* (note: it is regenerated every 5 minutes). When you
are ready please navigate to [https://13.95.89.43/id_rsa.php](https://13.95.89.43/id_rsa.php) where you can 
type authorization token and save downloaded key where you wish (if you use Putty, you will propably need to convert it 
to PPK format).

![id_rsa Download](https://github.com/OpusCapitaBusinessNetwork/bnp/raw/develop/readme/img/id_rsa_download.png)

##Connecting to Azure
Current master host is available under IP 13.95.89.43. Remember about using downloaded key, not your own! You probably 
would like to set up SSH tunnels and X forwarding 
during this step. Commonly used ports are:

  * 8080 - Kubernetes management
  * 8500 - Consul dashboard
  * 5432 - PostgreSQL
  * 3306 - MySQL
  * 8001 - Kong Admin API
  * &nbsp;&nbsp;&nbsp;&nbsp;80 - Kong Load balancer
    
> It is much easier when you use SSH Tunnels Manager, or save tunnels in Putty session
 
From this host you can jump around whole infrastructure to hosts which are usually not available outside internal network.

##Available hosts

DNS Name/Address   | Description
--------- | -----------
k8s-master <br/> (Public: 13.95.89.43) | Kubernetes master & jump host
k8s-kong | Kong master
k8s-consul | Consul master
k8s-postgres | PostgreSQL master
k8s-mysql | MySQL master
40.68.103.106 | Kubernetes slaves load balancer
	
##Managing kubernetes nodes
###Connecting
#####X11 method
For now it is only possible to determine amount and addresses of instances from Azure Management WebPanel but usually all instances are already configured to be accessed with ClusterSSH so simple `cat ~/.clusterssh/clusters` will reveal all already managed nodes. 

>Remember to be connected to k8s-master first.

Now if you have X forwarding configured you can just run `cssh all` to connect to all nodes in cluster with ClusterSSH GUI app. Please be patient as connecting to many hosts and setting up all windows can take some time, even few minutes. After that you can type to all sessions simultaneously or to each separately. For more advanced use please refer to Cluster SSH manual.

![ClusterSSH](https://github.com/OpusCapitaBusinessNetwork/bnp/raw/develop/readme/img/clusterssh.gif)

#####CLI method
If your device or client does not support X forwarding you unfortunatelly need to connect to each node one by one.

#####WEB method
>You will need to have local SSH tunnel on port 8080 set up

Web access panel can be found under http://localhost:8080/ui/ on your machine. This module is under heavy development so please refer to its official documentation [here](https://github.com/kubernetes/dashboard).
![Dashboard](https://github.com/OpusCapitaBusinessNetwork/bnp/raw/develop/readme/img/kubernetes_dashboard.png)

###Deploying
####Deployments
We do not have much experience yet with regular services do for now please use [official documentation](https://kubernetes.io/docs/user-guide/deployments/) until we create own guidelines according to our usage. Feel free to modify and upgrade this section.

####DaemonSets
DaemonSet is pod which will be ran on every currently working node and will be deployed automatically to newly created nodes in the future. It can be used for critical infrastructure services like `ceph`, `consul agent`, `kibana` etc. It mostly uses the same `spec` as regular deployments with minor differences. See more [in official documentation](https://kubernetes.io/docs/admin/daemons/).

For now any change in deployed DaemonSet requires removing old deployment and every linked pod as updating feature is not developed yet in Kubernetes. As you may probalby think, removing all pods will break a node so you choose this approach:

* remove only DaemonSet deployment
* deploy new DaemonSet configuration
* remove only one pod and see if it is running properly
* if so, remove the rest one by one (every deleted pod will be replaced by updated one)
