import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiGroupList } from '../../../../../model/api-group-list';
import { ApiGroupResource } from '../../../../../model/api-group-resource';
import { ApiResourceAction } from '../../../../../model/api-resource-action';
import { GroupVersion } from '../../../../../model/group-version';
import { PolicyRules } from '../../../../../model/policy-rules';
import { ApiGroupService } from '../../../../../services/api-group.service';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../../../../model/role';
import { RoleService } from '../../../../../services/role.service';
import { NamespaceList } from '../../../../../model/namespace-list';
import { timeout } from 'rxjs/operators';
import { NamespaceService } from '../../../../../services/namespace.service';


@Component({
  selector: 'app-role-new',
  templateUrl: './role-new.component.html',
})

export class RoleNewComponent implements OnInit {

  apiGroupList: ApiGroupList;
  apiGroupResources:  ApiGroupResource[] = []
  apiGroupResourcesTmp:  ApiGroupResource[] = []
  role: Role=new Role();
  private isEditRole: boolean =false
  filterNamespace: string
  namespaceList: NamespaceList = new NamespaceList();
 
  constructor(private roleService: RoleService, 
    private namespaceService: NamespaceService, 
    private apiGroupService: ApiGroupService,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }



  async ngOnInit(){
   
    var cr = this.route.snapshot.queryParamMap.get('role')
    var ns = this.route.snapshot.queryParamMap.get('namespace')

    this.listNamespaces();

    if (cr && ns){
      this.isEditRole=true
      await this.getAllClusterResources(true,cr,ns);
    }else{
      await this.getAllClusterResources(false,cr,null);
    }  
  
  }

  async  getAllClusterResources(isEdit:boolean,_clusterRole:string,_namespace:string){



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
        this.roleService.getRole(_namespace,_clusterRole).subscribe(c=>{
          this.role.metadata=c.body.metadata
          c.body.rules.forEach(rule=>{
            rule.apiGroups.forEach(ag=>{
              rule.resources.forEach(r=>{    
                this.apiGroupResources.forEach(agt=>{
                  if (ag=="" && agt.group=="v1"){
                    console.log(ag)
                    agt.resources.forEach(rt=>{
                      if (rt.name==r){
                        rt.actions.forEach(act=>{
                          if(rule.verbs.includes(act.verb)){
                            act.selected=true
                          } 
                        })
                      }                    
                    }) 
                  } else if (agt.group==ag){
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
      }
      
      },
      (e)=>{
        console.error("an error has ocurred while trying to fetch api groups",e)
      }
    )
  }
 

  private listNamespaces(){

    this.namespaceService.listAllNamespaces()
      .pipe(timeout(5000))
      .subscribe(
        (r)=>{
          if(r.ok){
            this.namespaceList=r.body
          }else{
            this.toastr.warning('could not be list namespaces.')
          }
        }, 
        (e)=>{
          this.toastr.error('An error ocurred trying to fetch namespaces.')
        }
      )
  }
  


  submitForm(form){

    this.role.rules =[]
    if (this.role.metadata.name && this.role.metadata.namespace){
      this.apiGroupResources.forEach(apires=>{
        var group = apires.group
        apires.resources.forEach(res=>{
          
          var pr = new PolicyRules();
          pr.apiGroups.push(group=="v1"?"":group);
          pr.resources.push(res.name);
          
          
          res.actions.filter(a=> a.selected==true).map(a=>a.verb).forEach(a=>{
            pr.verbs.push(a);
          })

          if (pr.verbs.length > 0){
            this.role.rules.push(pr);
          }
        })
      })
  
      
      if(this.isEditRole){
        this.roleService.updateRole(this.role.metadata.name,this.role.metadata.namespace,this.role).subscribe(r=>{
          if (r.ok){
            this.toastr.success('Role '+this.role.metadata.name + ' updated succesfully.')
          }else{
            this.toastr.warning(r.status.toString())
          }
        });
      }else{
        this.roleService.createRole(this.role.metadata.namespace,this.role).subscribe(r=>{
          if (r.ok){
            this.toastr.success('Role '+this.role.metadata.name + ' created succesfully.')
          }else{
            this.toastr.warning(r.status.toString())
          }
        });
      }
    }else{
      this.toastr.warning('Role name and namespace are required.')
    }
  }

}
