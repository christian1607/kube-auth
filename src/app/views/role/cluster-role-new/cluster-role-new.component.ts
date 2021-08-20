import { Component, OnInit } from '@angular/core';
import { ClusterRoleList } from '../../../model/cluster-role-list';
import { ClusterRoleService } from '../../../services/cluster-role.service';

@Component({
  selector: 'app-cluster-role-new',
  templateUrl: './cluster-role-new.component.html'
})

export class ClusterRoleNewComponent implements OnInit {

  clusterRoleList: ClusterRoleList;

  apigroups = [
    {
      id: 1, 
      name:'Kubernetes Core', 
      resources: [ 
        {name: 'Pod', actions: ['list','update','delete'] },
        {name: 'Deployment', actions: ['list','update'] },
        {name: 'Service', actions: ['list','update'] },
        {name: 'Node', actions: ['list','update'] },
        {name: 'ConfigMap', actions: ['list','update','create'] }
      ]
    },
    {id: 2, name:'Istio',resources: [ {name: 'VirtualService', actions: ['GET','PUT','DELETE'] }]},
    {id: 3, name:'Argo CD',resources: [ {name: 'VirtualService', actions: ['GET','PUT','DELETE'] }]}
  ];

  constructor(private clusterRoleService: ClusterRoleService) { }

  ngOnInit(): void {
    this.clusterRoleService.listClusterRoles().subscribe((r)=>{
      this.clusterRoleList = r.body
      console.log(this.clusterRoleList)
    }, (e)=>{

    });
  }

}
