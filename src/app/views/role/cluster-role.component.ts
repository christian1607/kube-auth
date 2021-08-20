import { Component, OnInit } from '@angular/core';
import { ClusterRoleList } from '../../model/cluster-role-list';
import { ClusterRoleService } from '../../services/cluster-role.service';

@Component({
  selector: 'app-cluster-role',
  templateUrl: './cluster-role.component.html'
})
export class ClusterRoleComponent implements OnInit {

  clusterRoleList: ClusterRoleList = new ClusterRoleList();

  constructor(private clusterRoleService: ClusterRoleService) { }

  ngOnInit(): void {
    this.clusterRoleService.listClusterRoles().subscribe((r)=>{
      
      console.log('rendering response')
      this.clusterRoleList = r.body
      console.log(this.clusterRoleList)
      console.log(this.clusterRoleList.items)

      }, (e)=>{

    });
  }
}
