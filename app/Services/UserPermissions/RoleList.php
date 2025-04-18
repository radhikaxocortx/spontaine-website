<?php

namespace App\Services\UserPermissions;

class RoleList
{
    const ROLES = [
        [
            'role' => 'ADMIN',
            'superUser' => true,
            'permissions' => [],
        ],
        [
            'role' => 'HELPDESK',
            'superUser' => false,
            'permissions' => [
                ['permission' => 'tickets.viewAny', 'customRules' => []],
                ['permission' => 'tickets.view', 'customRules' => []],
                ['permission' => 'tickets.updateStatus', 'customRules' => []],
                ['permission' => 'tickets.updateAssignment', 'customRules' => []],
            ],
        ],
        [
            'role' => 'HELPDESK PLUS',
            'superUser' => false,
            'permissions' => [
                ['permission' => 'tickets.viewAny', 'customRules' => []],
                ['permission' => 'tickets.view', 'customRules' => []],
                ['permission' => 'tickets.updateStatus', 'customRules' => []],
                ['permission' => 'tickets.updateAssignment', 'customRules' => []],
                ['permission' => 'tickets.updateDepartment', 'customRules' => []],
                ['permission' => 'tickets.updateUser', 'customRules' => []],
            ],
        ],
        [
            'role' => 'Space Queue Manager',
            'superUser' => false,
            'permissions' => [
                'spaceConfig.viewAny',
                'spaceConfig.view',
                'spaceConfig.create',
                'spaceConfig.update',
                'spaceConfig.delete',
                'spaceRequestCompany.viewAny',
                'spaceRequestCompany.view',
                'spaceRequestCompany.create',
                'spaceRequestCompany.update',
                'spaceRequestCompany.delete',
                'spaceRequest.viewAny',
                'spaceRequest.view',
                'spaceRequest.create',
                'spaceRequest.update',
                'spaceRequest.delete',
            ],
        ],
        //        [
        //            'role' => 'Facilities Manager',
        //            'superUser' => false,
        //            'permissions' => [],
        //        ],
        [
            'role' => 'Company Admin',
            'superUser' => false,
            'permissions' => [
                'location.viewAny',
                'location.view',
                'location.create',
                'location.update',
                'location.delete',
                'building.viewAny',
                'building.view',
                'building.create',
                'building.update',
                'building.delete',
                'company.viewAny',
                'company.view',
                'company.create',
                'company.update',
                'company.delete',
            ],
        ],
        [
            'role' => 'CONTENT CREATOR',
            'superUser' => false,
            'permissions' => [
                //announcement permissions
                ['permission' => 'announcement.viewAny', 'customRules' => []],
                ['permission' => 'announcement.view', 'customRules' => []],
                ['permission' => 'announcement.create', 'customRules' => []],
                ['permission' => 'announcement.update', 'customRules' => []],
                ['permission' => 'announcement.delete', 'customRules' => []],
                ['permission' => 'announcement.removeFile', 'customRules' => []],
                ['permission' => 'announcement.attachFile', 'customRules' => []],
                //page permissions
                ['permission' => 'page.viewAny', 'customRules' => []],
                ['permission' => 'page.view', 'customRules' => []],
                ['permission' => 'page.create', 'customRules' => []],
                ['permission' => 'page.update', 'customRules' => []],
                ['permission' => 'page.delete', 'customRules' => []],
                //article permissions
                ['permission' => 'article.viewAny', 'customRules' => []],
                ['permission' => 'article.view', 'customRules' => []],
                ['permission' => 'article.create', 'customRules' => []],
                ['permission' => 'article.update', 'customRules' => []],
                ['permission' => 'article.delete', 'customRules' => []],
                //activities permissions
                ['permission' => 'activity.viewAny', 'customRules' => []],
                ['permission' => 'activity.view', 'customRules' => []],
                ['permission' => 'activity.create', 'customRules' => []],
                ['permission' => 'activity.update', 'customRules' => []],
                ['permission' => 'activity.delete', 'customRules' => []],
                //video image document permission
                ['permission' => 'video.manage', 'customRules' => []],
                ['permission' => 'image.manage', 'customRules' => []],
                ['permission' => 'document.manage', 'customRules' => []],
                //gallery
                ['permission' => 'gallery', 'customRules' => []],
                ['permission' => 'nav', 'customRules' => []],
                ['permission' => 'footer', 'customRules' => []],
            ],
        ],
        [
            'role' => 'CONTENT ADMIN',
            'superUser' => false,
            'permissions' => [
                //announcement permissions
                ['permission' => 'announcement.viewAny', 'customRules' => []],
                ['permission' => 'announcement.view', 'customRules' => []],
                ['permission' => 'announcement.create', 'customRules' => []],
                ['permission' => 'announcement.update', 'customRules' => []],
                ['permission' => 'announcement.delete', 'customRules' => []],
                ['permission' => 'announcement.removeFile', 'customRules' => []],
                ['permission' => 'announcement.attachFile', 'customRules' => []],
                ['permission' => 'announcement.publish', 'customRules' => []],
                //page permissions
                ['permission' => 'page.viewAny', 'customRules' => []],
                ['permission' => 'page.view', 'customRules' => []],
                ['permission' => 'page.create', 'customRules' => []],
                ['permission' => 'page.update', 'customRules' => []],
                ['permission' => 'page.delete', 'customRules' => []],
                ['permission' => 'page.publish', 'customRules' => []],
                //article permissions
                ['permission' => 'article.viewAny', 'customRules' => []],
                ['permission' => 'article.view', 'customRules' => []],
                ['permission' => 'article.create', 'customRules' => []],
                ['permission' => 'article.update', 'customRules' => []],
                ['permission' => 'article.delete', 'customRules' => []],
                ['permission' => 'article.publish', 'customRules' => []],
                //activities permissions
                ['permission' => 'activity.viewAny', 'customRules' => []],
                ['permission' => 'activity.view', 'customRules' => []],
                ['permission' => 'activity.create', 'customRules' => []],
                ['permission' => 'activity.update', 'customRules' => []],
                ['permission' => 'activity.delete', 'customRules' => []],
                ['permission' => 'activity.publish', 'customRules' => []],
                //video image document permission
                ['permission' => 'video.manage', 'customRules' => []],
                ['permission' => 'image.manage', 'customRules' => []],
                ['permission' => 'document.manage', 'customRules' => []],
                //gallery
                ['permission' => 'gallery', 'customRules' => []],
                ['permission' => 'gallery.publish', 'customRules' => []],
                ['permission' => 'nav', 'customRules' => []],
                ['permission' => 'footer', 'customRules' => []],
            ],
        ],
        [
            'role' => 'ANNOUNCEMENT MANAGER',
            'superUser' => false,
            'permissions' => [
                ['permission' => 'notification', 'customRules' => []],
            ],
        ],
        [
            'role' => 'EXTERNAL CONTENT MANAGER',
            'superUser' => false,
            'permissions' => [
                //article permissions
                ['permission' => 'article.viewAny', 'customRules' => []],
                ['permission' => 'article.view', 'customRules' => []],
                ['permission' => 'article.create', 'customRules' => []],
                ['permission' => 'article.update', 'customRules' => []],
                ['permission' => 'article.delete', 'customRules' => []],
                //activities permissions
                ['permission' => 'activity.viewAny', 'customRules' => []],
                ['permission' => 'activity.view', 'customRules' => []],
                ['permission' => 'activity.create', 'customRules' => []],
                ['permission' => 'activity.update', 'customRules' => []],
                ['permission' => 'activity.delete', 'customRules' => []],
            ],
        ],
    ];
}
