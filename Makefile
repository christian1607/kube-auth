
create_kubeauth_sa:
	kubectl apply -f kube-auth-k8s.yaml 

get_sa_token:
	kubectl get secrets kube-auth-token -o yaml | yq -r '.data.token' | base64 -d | yq

get_apiserver_url:
	yq  '.clusters[] | select(.name=="kind-k8s").cluster.server' /Users/christian/.kube/config 