import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiGroupList } from '../../../model/api-group-list';
import { ApiGroupResource } from '../../../model/api-group-resource';
import { ApiResource } from '../../../model/api-resource';
import { ApiResourceAction } from '../../../model/api-resource-action';
import { ClusterRole } from '../../../model/cluster-role';
import { GroupVersion } from '../../../model/group-version';
import { PolicyRules } from '../../../model/policy-rules';
import { ApiGroupService } from '../../../services/api-group.service';
import { ClusterRoleService } from '../../../services/cluster-role.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cluster-role-new',
  templateUrl: './cluster-role-new.component.html'
})

export class ClusterRoleNewComponent implements OnInit {

  apiGroupList: ApiGroupList;
  apiGroupResources:  ApiGroupResource[] = []
  apiGroupResourcesTmp:  ApiGroupResource[] = []
  clusterRole: ClusterRole=new ClusterRole();
  private isEditClusterRole: boolean =false
 
  constructor(private clusterRoleService: ClusterRoleService, 
    private apiGroupService: ApiGroupService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }



  async ngOnInit(){
   
    var cr = this.route.snapshot.queryParamMap.get('clusterrole')
    if (cr){
      this.isEditClusterRole=true
      await this.getAllClusterResources(true,cr);
    }else{
      await this.getAllClusterResources(false,cr);
    }
      
  }

  completeFormToEdit(_clusterRole:string){
      this.clusterRoleService.getClusterRole(_clusterRole).subscribe(c=>{
        this.clusterRole.metadata.name=c.body.metadata.name
        c.body.rules.forEach(rule=>{
          rule.apiGroups.forEach(ag=>{
            rule.resources.forEach(r=>{    
              this.apiGroupResources.forEach(agt=>{
                if (agt.group==ag){

                  agt.resources.forEach(rt=>{
                    if (rt.name==r){
                      rt.actions.forEach(act=>{
                        if(rule.verbs.includes(act.verb)){
                          act.selected=true
                        } 
                      })
                    }                    
                  })      
                } 
              })
              
            })
          })
        })
      })
      
      this.isEditClusterRole=true

  }

  async  getAllClusterResources(isEdit:boolean,_clusterRole:string){



    var groupVersions = Array<GroupVersion>();
    await this.apiGroupService.listClusterRoles().subscribe( r=> {
        
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
        this.apiGroupResources.push(apiGroupResource)

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
          this.apiGroupResources.push(apiGroupResource)

        }, e=>{
          console.error("an error has ocurred while trying to fetch api resources",e)
        })
      });

      if (isEdit){
        this.clusterRoleService.getClusterRole(_clusterRole).subscribe(c=>{
          this.clusterRole.metadata.name=c.body.metadata.name
          c.body.rules.forEach(rule=>{
            rule.apiGroups.forEach(ag=>{
              rule.resources.forEach(r=>{    
                this.apiGroupResources.forEach(agt=>{
                  if (agt.group==ag){
                    agt.resources.forEach(rt=>{
                      if (rt.name==r){
                        rt.actions.forEach(act=>{
                          if(rule.verbs.includes(act.verb)){
                            act.selected=true
                          } 
                        })
                      }                    
                    })      
                  } 
                })
                
              })
            })
          })
        
          console.log(this.apiGroupResources)
        })
      }
      
      },
      (e)=>{
        console.error("an error has ocurred while trying to fetch api groups",e)
      }
    )
  }
 

   
  


  submitForm(form){

    this.clusterRole.rules =[]
    if (this.clusterRole.metadata.name){
      this.apiGroupResources.forEach(apires=>{
        var group = apires.group
        apires.resources.forEach(res=>{
          
          var pr = new PolicyRules();
          pr.apiGroups.push(group);
          pr.resources.push(res.name);
          
          
          res.actions.filter(a=> a.selected==true).map(a=>a.verb).forEach(a=>{
            pr.verbs.push(a);
          })

          if (pr.verbs.length > 0){
            this.clusterRole.rules.push(pr);
          }
        })
      })
  
      
      if(this.isEditClusterRole){
        this.clusterRoleService.updateClusterRole(this.clusterRole.metadata.name,this.clusterRole).subscribe(r=>{
          if (r.ok){
            this.toastr.success('Cluster role '+this.clusterRole.metadata.name + ' was updated succesfully.')
          }else{
            this.toastr.warning(r.status.toString())
          }
        });
      }else{
        this.clusterRoleService.createClusterRole(this.clusterRole).subscribe(r=>{
          if (r.ok){
            this.toastr.success('Cluster role '+this.clusterRole.metadata.name + ' was created succesfully.')
          }else{
            this.toastr.warning(r.status.toString())
          }
        });
      }
    }else{
      this.toastr.warning('A cluster name must be define.')
    }
  }

}
