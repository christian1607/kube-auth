import { Component, OnInit } from '@angular/core';
import { ApiGroupList } from '../../../model/api-group-list';
import { ApiGroupResource } from '../../../model/api-group-resource';
import { ApiResource } from '../../../model/api-resource';
import { ApiResourceAction } from '../../../model/api-resource-action';
import { ClusterRole } from '../../../model/cluster-role';
import { GroupVersion } from '../../../model/group-version';
import { PolicyRules } from '../../../model/policy-rules';
import { ApiGroupService } from '../../../services/api-group.service';
import { ClusterRoleService } from '../../../services/cluster-role.service';

@Component({
  selector: 'app-cluster-role-new',
  templateUrl: './cluster-role-new.component.html'
})

export class ClusterRoleNewComponent implements OnInit {

  apiGroupList: ApiGroupList;
  apiGroupResources:  ApiGroupResource[] = []
  apiGroupResourcesTmp:  ApiGroupResource[] = []
  clusterRole: ClusterRole=new ClusterRole();
 
  constructor(private clusterRoleService: ClusterRoleService, private apiGroupService: ApiGroupService) { }

  async ngOnInit(){
    
    await this.getAllClusterResources();
    this.apiGroupResources = this.apiGroupResourcesTmp
    console.log(this.apiGroupResources)
  }

  async  getAllClusterResources(){

    var groupVersions = Array<GroupVersion>();
    this.apiGroupService.listClusterRoles().subscribe( r=> {
        
      this.apiGroupList = r.body

      this.apiGroupList.groups.forEach( (ag)=>{
        ag.versions.forEach((v)=>{
          groupVersions.push(new GroupVersion(v.groupVersion,v.version));
        })
      })

      
      this.apiGroupService.listResourcesV1().subscribe(r=>{
    
        var apiGroupResource = new ApiGroupResource(r.body.groupVersion,r.body.resources)
        apiGroupResource.resources.forEach(r=>{
          r.actions = []
          r.verbs.forEach(v=>{
              r.actions.push(new ApiResourceAction(v,false))
          })
        })
        this.apiGroupResourcesTmp.push(apiGroupResource)

      }, e=>{
        console.error("an error has ocurred while trying to fetch api resources v1",e)
      })


      groupVersions.forEach( gv => {
        this.apiGroupService.listResources(gv.groupVersion).subscribe(r=>{
      
          var apiGroupResource = new ApiGroupResource(r.body.groupVersion,r.body.resources)
          apiGroupResource.resources.forEach(r=>{
            r.actions = []
            r.verbs.forEach(v=>{
                r.actions.push(new ApiResourceAction(v,false))
            })
          })
          this.apiGroupResourcesTmp.push(apiGroupResource)

        }, e=>{
          console.error("an error has ocurred while trying to fetch api resources",e)
        })
      });
    
    },
    (e)=>{
      console.error("an error has ocurred while trying to fetch api groups",e)
    }
  )
   
  }


  submitForm(form){

    console.log(form)
    console.log(this.clusterRole)


    this.apiGroupResources.forEach(apires=>{
      var group = apires.group
      apires.resources.forEach(res=>{
        
        var pr = new PolicyRules();
        pr.apiGroups.push(group);
        pr.resources.push(res.name);
        res.actions.filter(a=> a.selected==true).map(a=>a.verb).forEach(a=>{
          pr.verbs.push(a);
        })

        this.clusterRole.rules.push(pr);
      })
    })

    this.clusterRoleService.createClusterRole(this.clusterRole);
  }

}
