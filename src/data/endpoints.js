export const ENDPOINTS = {
  'Admin Auth': [
    {
      id: 'admin-login',
      name: 'Login',
      method: 'POST',
      path: '/auth/admins/login',
      description: 'Login as an admin user',
      isProtected: false,
      example: {
        body: JSON.stringify({
          email: 'superadmin@example.com',
          password: 'Admin@123456'
        }, null, 2),
        bodyExplain: {
          email: 'Admin email address (required)',
          password: 'Admin password (required)'
        },
        response: {
          success: true,
          data: {
            admin: {
              id: 'admin-uuid',
              email: 'superadmin@example.com',
              firstName: 'Ahmed',
              role: 'SUPER_ADMIN'
            },
            accessToken: 'eyJhbGc...',
            refreshToken: 'eyJhbGc...'
          }
        }
      }
    },
    {
      id: 'admin-register',
      name: 'Register',
      method: 'POST',
      path: '/auth/admins/register',
      description: 'Create a new admin account (Super Admin only)',
      isProtected: true,
      example: {
        body: JSON.stringify({
          firstName: 'John',
          secondName: 'Doe',
          email: 'john.doe@example.com',
          password: 'SecurePassword@123',
          role: 'MODERATOR',
          ownerType: 'FACULTY'
        }, null, 2),
        bodyExplain: {
          firstName: 'First name of the admin (required)',
          secondName: 'Last name/surname of the admin (required)',
          email: 'Email address of the admin (required)',
          password: 'Strong password for the admin account (required)',
          role: 'Admin role: SUPER_ADMIN, ADMIN, or MODERATOR (required)',
          ownerType: 'Owner type: FACULTY, CENTER, or ADMINISTRATION (required)'
        }
      }
    },
    {
      id: 'admin-refresh',
      name: 'Refresh Token',
      method: 'POST',
      path: '/auth/admins/refresh',
      description: 'Refresh access token',
      isProtected: false,
      example: {
        body: JSON.stringify({
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc3NjM0OTUzNCwiZXhwIjoxNzc2OTU0MzM0fQ.rZajn7qJGxkmDvaIp1fhRU1nX2UPN2D2CJk8Pocz75Y'
        }, null, 2),
        bodyExplain: {
          refreshToken: 'Refresh token from previous login (required) - Will be auto-filled'
        }
      }
    },
    {
      id: 'admin-logout',
      name: 'Logout',
      method: 'POST',
      path: '/auth/admins/logout',
      description: 'Logout from current session',
      isProtected: false,
      example: {
        body: JSON.stringify({
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInR5cGUiOiJhZG1pbiIsImlhdCI6MTc3NjM0OTUzNCwiZXhwIjoxNzc2OTU0MzM0fQ.rZajn7qJGxkmDvaIp1fhRU1nX2UPN2D2CJk8Pocz75Y'
        }, null, 2),
        bodyExplain: {
          refreshToken: 'Refresh token to logout (required) - Will be auto-filled'
        }
      }
    },
    {
      id: 'admin-logout-all',
      name: 'Logout All',
      method: 'POST',
      path: '/auth/admins/logout-all',
      description: 'Logout from all sessions',
      isProtected: true,
      example: {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    },
    {
      id: 'admin-update',
      name: 'Update Admin',
      method: 'PUT',
      path: '/auth/admins/:adminId',
      description: 'Update admin information',
      isProtected: true,
      example: {
        pathParams: {
          adminId: 'd42ab0ba-eba9-4877-b2bf-1b9663b422e6'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          firstName: 'UpdatedName',
          secondName: 'UpdatedSurname',
          role: 'SUPER_ADMIN'
        }, null, 2),
        bodyExplain: {
          firstName: 'Updated first name (optional)',
          secondName: 'Updated surname (optional)',
          role: 'New role: SUPER_ADMIN, ADMIN, or MODERATOR (optional)'
        }
      }
    },
    {
      id: 'admin-delete',
      name: 'Delete Admin',
      method: 'DELETE',
      path: '/auth/admins/:adminId',
      description: 'Delete an admin account',
      isProtected: true,
      example: {
        pathParams: {
          adminId: 'd42ab0ba-eba9-4877-b2bf-1b9663b422e6'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    }
  ],
  'Doctor Auth': [
    {
      id: 'doctor-login',
      name: 'Login',
      method: 'POST',
      path: '/auth/doctors/login',
      description: 'Login as a doctor',
      isProtected: false,
      example: {
        body: JSON.stringify({
          email: 'hassan@example.com',
          password: 'Doctor@123456'
        }, null, 2),
        bodyExplain: {
          email: 'Doctor email address (required)',
          password: 'Doctor password (required)'
        }
      }
    },
    {
      id: 'doctor-register',
      name: 'Register',
      method: 'POST',
      path: '/auth/doctors/register',
      description: 'Register a new doctor',
      isProtected: true,
      example: {
        body: JSON.stringify({
          facultyId: '8083308c-93ec-4e4d-b665-d63c4f0115bf',
          departmentId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5',
          firstName_en: 'Mohamed',
          secondName_en: 'Ahmed',
          firstName_ar: 'محمد',
          secondName_ar: 'أحمد',
          email: 'doctor@example.com',
          personalemail: 'dr.mohamed@personal.com',
          password: 'DoctorPass@123',
          jobTitle_en: 'Associate Professor',
          jobTitle_ar: 'أستاذ مساعد',
          about_en: 'Experienced professor with 10+ years in the field',
          about_ar: 'أستاذ ذو خبرة مع أكثر من 10 سنوات في المجال'
        }, null, 2),
        bodyExplain: {
          facultyId: 'Faculty ID that MUST exist in your database (required) - Get from Faculty endpoints or database',
          departmentId: 'Department ID that MUST exist in your database (required) - Get from Department endpoints or database',
          firstName_en: 'First name in English (required)',
          secondName_en: 'Last name in English (required)',
          firstName_ar: 'First name in Arabic (required)',
          secondName_ar: 'Last name in Arabic (required)',
          email: 'Doctor institutional email address (required)',
          personalemail: 'Doctor personal email address (required)',
          password: 'Strong password (required)',
          jobTitle_en: 'Job title in English (required)',
          jobTitle_ar: 'Job title in Arabic (required)',
          about_en: 'Brief biography/about text in English (required)',
          about_ar: 'Brief biography/about text in Arabic (optional)'
        }
      }
    },
    {
      id: 'doctor-refresh',
      name: 'Refresh Token',
      method: 'POST',
      path: '/auth/doctors/refresh',
      description: 'Refresh doctor access token',
      isProtected: false,
      example: {
        body: JSON.stringify({
          refreshToken: 'eyJhbGc...'
        }, null, 2),
        bodyExplain: {
          refreshToken: 'Refresh token from previous login (required) - Will be auto-filled'
        }
      }
    },
    {
      id: 'doctor-logout',
      name: 'Logout',
      method: 'POST',
      path: '/auth/doctors/logout',
      description: 'Logout doctor',
      isProtected: false,
      example: {
        body: JSON.stringify({
          refreshToken: 'eyJhbGc...'
        }, null, 2),
        bodyExplain: {
          refreshToken: 'Refresh token to logout (required) - Will be auto-filled'
        }
      }
    }
  ],
  'Posts': [
    {
      id: 'post-detail',
      name: 'Get Details',
      method: 'GET',
      path: '/posts/:postId',
      description: 'Get post details (Returns 404 if post is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          postId: 'post-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'post-by-doctor',
      name: 'Get by Doctor ID',
      method: 'GET',
      path: '/posts/doctor/:doctorId',
      description: 'Get all posts for a specific doctor (Doctor ID required - Returns 400 if missing, 404 if doctor not found)',
      isProtected: false,
      example: {
        pathParams: {
          doctorId: '550e8400-e29b-41d4-a716-446655440000'
        },
        body: ''
      }
    },
    {
      id: 'post-create',
      name: 'Create',
      method: 'POST',
      path: '/posts',
      description: 'Create new post',
      isProtected: true,
      example: {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          title_en: 'New Blog Post',
          title_ar: 'منشور مدونة جديد',
          content_en: 'Post content here',
          content_ar: 'محتوى المنشور هنا',
          doctorId: 'a49458de-05fc-4d30-9136-40761afcb315',
          postImgs: {
            create: [
              {
                image: 'https://example.com/image1.jpg'
              },
              {
                image: 'https://example.com/image2.jpg'
              },
              {
                image: 'https://example.com/image3.jpg'
              }
            ]
          }
        }, null, 2),
        bodyExplain: {
          title_en: 'Post title in English (required)',
          title_ar: 'Post title in Arabic (required)',
          content_en: 'Post content in English (required)',
          content_ar: 'Post content in Arabic (required)',
          doctorId: 'Doctor UUID (required)',
          postImgs: 'Nested create object for images (optional)',
          'postImgs.create': 'Array of image objects to create',
          'postImgs.create[].image': 'Image URL (required)'
        }
      }
    },
    {
      id: 'post-update',
      name: 'Update',
      method: 'PUT',
      path: '/posts/:postId',
      description: 'Update post information (Returns 410 if post is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          postId: 'post-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          title_en: 'Updated Post Title',
          title_ar: 'عنوان المنشور المحدث',
          content_en: 'Updated content',
          content_ar: 'المحتوى المحدث'
        }, null, 2),
        bodyExplain: {
          title_en: 'Updated post title in English (optional)',
          title_ar: 'Updated post title in Arabic (optional)',
          content_en: 'Updated post content in English (optional)',
          content_ar: 'Updated post content in Arabic (optional)'
        }
      }
    },
    {
      id: 'post-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/posts/:postId',
      description: 'Delete a post (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          postId: 'post-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    }
  ],
  'Awards': [
    {
      id: 'award-create',
      name: 'Create',
      method: 'POST',
      path: '/achievements/awards',
      description: 'Create a new award for the authenticated doctor',
      isProtected: true,
      example: {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          awardName_en: 'Best Doctor Award',
          awardName_ar: 'جائزة أفضل طبيب',
          donorName_en: 'Medical Association',
          donorName_ar: 'الجمعية الطبية',
          description_en: 'Awarded for outstanding medical services',
          description_ar: 'تم منحها لتقديم خدمات طبية متميزة',
          issuedAt: '2024-04-17T00:00:00Z',
          doctorId: 'a49458de-05fc-4d30-9136-40761afcb315',
          images: [
            'https://example.com/award1.jpg',
            'https://example.com/award2.jpg',
            'https://example.com/award3.jpg',
            'https://example.com/award4.jpg',
            'https://example.com/award5.jpg'
          ]
        }, null, 2),
        bodyExplain: {
          awardName_en: 'Award name in English (required)',
          awardName_ar: 'Award name in Arabic (required)',
          donorName_en: 'Donor name in English (required)',
          donorName_ar: 'Donor name in Arabic (required)',
          description_en: 'Award description in English (required)',
          description_ar: 'Award description in Arabic (required)',
          issuedAt: 'Date when award was issued (required)',
          doctorId: 'Doctor UUID (required)',
          images: 'Array of image URLs (optional)'
        }
      }
    },
    {
      id: 'award-by-id',
      name: 'Get Details',
      method: 'GET',
      path: '/achievements/awards/:awardId',
      description: 'Retrieve a single award by ID (Returns 404 if award is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          awardId: 'award-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'award-by-doctor',
      name: 'Get by Doctor',
      method: 'GET',
      path: '/achievements/awards/doctor/:doctorId',
      description: 'Get all awards for a specific doctor (Doctor ID required - Returns 400 if missing, 404 if doctor not found)',
      isProtected: false,
      example: {
        pathParams: {
          doctorId: '550e8400-e29b-41d4-a716-446655440000'
        },
        body: ''
      }
    },
    {
      id: 'award-update',
      name: 'Update',
      method: 'PUT',
      path: '/achievements/awards/:awardId',
      description: 'Update an award (Returns 410 if already deleted, only owner can update)',
      isProtected: true,
      example: {
        pathParams: {
          awardId: 'award-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          awardName_en: 'Updated Award Title',
          awardName_ar: 'عنوان الجائزة المحدث',
          description_en: 'Updated description',
          description_ar: 'الوصف المحدث',
          donorName_en: 'Updated Donor',
          donorName_ar: 'المانح المحدث',
          issuedAt: '2024-04-17T00:00:00Z',
          images: [
            'https://example.com/updated-image.jpg'
          ]
        }, null, 2),
        bodyExplain: {
          awardName_en: 'Updated award name in English (optional)',
          awardName_ar: 'Updated award name in Arabic (optional)',
          description_en: 'Updated description in English (optional)',
          description_ar: 'Updated description in Arabic (optional)',
          donorName_en: 'Updated donor name in English (optional)',
          donorName_ar: 'Updated donor name in Arabic (optional)',
          issuedAt: 'Updated award issue date (optional)',
          images: 'Updated array of image URLs (optional)'
        }
      }
    },
    {
      id: 'award-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/achievements/awards/:awardId',
      description: 'Soft delete an award (Returns 400 if already deleted, only owner can delete)',
      isProtected: true,
      example: {
        pathParams: {
          awardId: 'award-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    },
    {
      id: 'award-restore',
      name: 'Restore',
      method: 'POST',
      path: '/achievements/awards/:awardId/restore',
      description: 'Restore a soft-deleted award (only owner can restore)',
      isProtected: true,
      example: {
        pathParams: {
          awardId: 'award-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    }
  ],
  'Scientific Qualifications': [
    {
      id: 'sq-create',
      name: 'Create',
      method: 'POST',
      path: '/achievements/scientific-qualifications',
      description: 'Create a new scientific qualification for the authenticated doctor',
      isProtected: true,
      example: {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          scitationQualificationName_en: 'PhD in Medicine',
          scitationQualificationName_ar: 'دكتوراه في الطب',
          specialty_en: 'Cardiology',
          specialty_ar: 'أمراض القلب',
          donorName_en: 'Harvard University',
          donorName_ar: 'جامعة هارفارد',
          obtainedAt: '2020-06-15T00:00:00Z',
          description_en: 'Specialized in cardiovascular medicine',
          description_ar: 'متخصص في طب القلب والأوعية الدموية',
          doctorId: 'a49458de-05fc-4d30-9136-40761afcb315'
        }, null, 2),
        bodyExplain: {
          scitationQualificationName_en: 'Qualification name in English (required, 3-200 chars)',
          scitationQualificationName_ar: 'Qualification name in Arabic (required, 3-200 chars)',
          specialty_en: 'Specialty in English (required, 2-200 chars)',
          specialty_ar: 'Specialty in Arabic (required, 2-200 chars)',
          donorName_en: 'Donor/University name in English (required, 2-200 chars)',
          donorName_ar: 'Donor/University name in Arabic (required, 2-200 chars)',
          obtainedAt: 'Obtained date in ISO 8601 format (required)',
          description_en: 'Description in English (optional, max 1000 chars)',
          description_ar: 'Description in Arabic (optional, max 1000 chars)',
          doctorId: 'Doctor UUID (required)'
        }
      }
    },
    {
      id: 'sq-by-id',
      name: 'Get Details',
      method: 'GET',
      path: '/achievements/scientific-qualifications/:qualificationId',
      description: 'Retrieve a single qualification by ID (Returns 404 if qualification is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          qualificationId: 'qualification-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'sq-by-doctor',
      name: 'Get by Doctor',
      method: 'GET',
      path: '/achievements/scientific-qualifications/doctor/:doctorId',
      description: 'Get all qualifications for a specific doctor (Doctor ID required - Returns 400 if missing, 404 if doctor not found)',
      isProtected: false,
      example: {
        pathParams: {
          doctorId: '550e8400-e29b-41d4-a716-446655440000'
        },
        body: ''
      }
    },
    {
      id: 'sq-update',
      name: 'Update',
      method: 'PUT',
      path: '/achievements/scientific-qualifications/:qualificationId',
      description: 'Update a qualification (Returns 410 if already deleted, only owner can update). Note: Qualification name (scitationQualificationName_en/ar) cannot be updated due to unique constraint on (doctor_id, qualification_name_en, qualification_name_ar)',
      isProtected: true,
      example: {
        pathParams: {
          qualificationId: 'qualification-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          specialty_en: 'Internal Medicine',
          specialty_ar: 'الطب الباطني',
          donorName_en: 'Stanford University',
          donorName_ar: 'جامعة ستانفورد',
          description_en: 'Updated specialization details',
          description_ar: 'تفاصيل التخصص المحدثة'
        }, null, 2),
        bodyExplain: {
          specialty_en: 'Updated specialty in English (optional)',
          specialty_ar: 'Updated specialty in Arabic (optional)',
          donorName_en: 'Updated donor/university name in English (optional)',
          donorName_ar: 'Updated donor/university name in Arabic (optional)',
          description_en: 'Updated description in English (optional)',
          description_ar: 'Updated description in Arabic (optional)',
          note: 'Qualification name fields cannot be updated due to unique constraint'
        }
      }
    },
    {
      id: 'sq-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/achievements/scientific-qualifications/:qualificationId',
      description: 'Soft delete a qualification (Returns 400 if already deleted, only owner can delete)',
      isProtected: true,
      example: {
        pathParams: {
          qualificationId: 'qualification-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    },
    {
      id: 'sq-restore',
      name: 'Restore',
      method: 'POST',
      path: '/achievements/scientific-qualifications/:qualificationId/restore',
      description: 'Restore a soft-deleted qualification (only owner can restore)',
      isProtected: true,
      example: {
        pathParams: {
          qualificationId: 'qualification-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    }
  ],
  'Scientific Research': [
    {
      id: 'sr-create',
      name: 'Create',
      method: 'POST',
      path: '/achievements/scientific-research',
      description: 'Create a new scientific research record for the authenticated doctor',
      isProtected: true,
      example: {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          scientificresearch_title_en: 'Advanced Cancer Treatment Study',
          scientificresearch_title_ar: 'دراسة العلاج المتقدم للسرطان',
          publisher_en: 'Medical Journal International',
          publisher_ar: 'مجلة الطب الدولية',
          publishType_en: 'Journal Article',
          publishType_ar: 'مقال في مجلة',
          publishedAt: '2025-03-15T00:00:00Z',
          description_en: 'Study on new cancer treatment methods and their effectiveness',
          description_ar: 'دراسة حول طرق العلاج الجديدة للسرطان وفعاليتها',
          doctorId: 'a49458de-05fc-4d30-9136-40761afcb315'
        }, null, 2),
        bodyExplain: {
          scientificresearch_title_en: 'Research title in English (required, 3-200 chars)',
          scientificresearch_title_ar: 'Research title in Arabic (required, 3-200 chars)',
          publisher_en: 'Publisher in English (required, 2-200 chars)',
          publisher_ar: 'Publisher in Arabic (required, 2-200 chars)',
          publishType_en: 'Publish type in English (required, 2-100 chars)',
          publishType_ar: 'Publish type in Arabic (required, 2-100 chars)',
          publishedAt: 'Published date in ISO 8601 format (required)',
          description_en: 'Description in English (optional, max 1000 chars)',
          description_ar: 'Description in Arabic (optional, max 1000 chars)',
          doctorId: 'Doctor UUID (required)'
        }
      }
    },
    {
      id: 'sr-by-id',
      name: 'Get Details',
      method: 'GET',
      path: '/achievements/scientific-research/:researchId',
      description: 'Retrieve a single research record by ID (Returns 404 if research is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          researchId: 'research-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'sr-by-doctor',
      name: 'Get by Doctor',
      method: 'GET',
      path: '/achievements/scientific-research/doctor/:doctorId',
      description: 'Get all research records for a specific doctor (Doctor ID required - Returns 400 if missing, 404 if doctor not found)',
      isProtected: false,
      example: {
        pathParams: {
          doctorId: '550e8400-e29b-41d4-a716-446655440000'
        },
        body: ''
      }
    },
    {
      id: 'sr-update',
      name: 'Update',
      method: 'PUT',
      path: '/achievements/scientific-research/:researchId',
      description: 'Update a research record (Returns 410 if already deleted, only owner can update)',
      isProtected: true,
      example: {
        pathParams: {
          researchId: 'research-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          scientificresearch_title_en: 'Updated Cancer Treatment Study',
          scientificresearch_title_ar: 'دراسة العلاج المحدثة للسرطان',
          publisher_en: 'Updated Medical Journal',
          publisher_ar: 'مجلة طبية محدثة',
          publishType_en: 'Conference Paper',
          publishType_ar: 'ورقة المؤتمر',
          publishedAt: '2025-04-15T00:00:00Z',
          description_en: 'Updated study on cancer treatment',
          description_ar: 'دراسة محدثة عن علاج السرطان'
        }, null, 2),
        bodyExplain: {
          scientificresearch_title_en: 'Updated research title in English (optional)',
          scientificresearch_title_ar: 'Updated research title in Arabic (optional)',
          publisher_en: 'Updated publisher name in English (optional)',
          publisher_ar: 'Updated publisher name in Arabic (optional)',
          publishType_en: 'Updated publish type in English (optional)',
          publishType_ar: 'Updated publish type in Arabic (optional)',
          publishedAt: 'Updated published date in ISO 8601 format (optional)',
          description_en: 'Updated description in English (optional)',
          description_ar: 'Updated description in Arabic (optional)'
        }
      }
    },
    {
      id: 'sr-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/achievements/scientific-research/:researchId',
      description: 'Soft delete a research record (Returns 400 if already deleted, only owner can delete)',
      isProtected: true,
      example: {
        pathParams: {
          researchId: 'research-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    },
    {
      id: 'sr-restore',
      name: 'Restore',
      method: 'POST',
      path: '/achievements/scientific-research/:researchId/restore',
      description: 'Restore a soft-deleted research record (only owner can restore)',
      isProtected: true,
      example: {
        pathParams: {
          researchId: 'research-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    }
  ],
  'Administrations': [
    {
      id: 'admin-list',
      name: 'Get All',
      method: 'GET',
      path: '/administrations',
      description: 'Get all administrations with pagination',
      isProtected: false,
      params: ['page', 'limit', 'is_active', 'search'],
      example: {
        body: ''
      }
    },
    {
      id: 'admin-detail',
      name: 'Get Details',
      method: 'GET',
      path: '/administrations/:administrationId',
      description: 'Get specific administration details (Returns 404 if administration is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          administrationId: 'da2758da-0e26-482e-b74f-8b80598f419a'
        },
        body: ''
      }
    },
    {
      id: 'admin-create',
      name: 'Create',
      method: 'POST',
      path: '/administrations',
      description: 'Create new administration',
      isProtected: true,
      example: {
        body: JSON.stringify({
          ownerId: 'aeaa3407-01df-4cba-897e-457adf180cb4',
          adminsName_en: 'Quality Assurance',
          adminsName_ar: 'ضمان الجودة',
          slug: 'quality-assurance-2026',
          logo: 'https://example.com/logos/qa-admin.png',
          managerFirstName_en: 'Ahmed',
          managerSecondName_en: 'Ibrahim',
          managerThirdName_en: 'Saleh',
          managerFirstName_ar: 'أحمد',
          managerSecondName_ar: 'إبراهيم',
          managerThirdName_ar: 'صالح'
        }, null, 2),
        bodyExplain: {
          ownerId: 'Owner ID (admin user ID who owns this administration, required)',
          adminsName_en: 'Administration name in English (required) - Must be unique',
          adminsName_ar: 'Administration name in Arabic (required) - Must be unique',
          slug: 'Unique slug for URL (lowercase with hyphens only, required) - Must be unique. Change before each test!',
          logo: 'Logo image URL (must be valid URL, required)',
          managerFirstName_en: 'Manager first name in English (required)',
          managerSecondName_en: 'Manager second name in English (required)',
          managerThirdName_en: 'Manager third name in English (required)',
          managerFirstName_ar: 'Manager first name in Arabic (required)',
          managerSecondName_ar: 'Manager second name in Arabic (required)',
          managerThirdName_ar: 'Manager third name in Arabic (required)'
        }
      }
    },
    {
      id: 'admin-update',
      name: 'Update',
      method: 'PUT',
      path: '/administrations/:administrationId',
      description: 'Update administration (Returns 410 if administration is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          administrationId: 'da2758da-0e26-482e-b74f-8b80598f419a'
        },
        body: JSON.stringify({
          adminsName_en: 'Updated Name',
          adminsName_ar: 'اسم محدث',
          slug: 'updated-administration',
          logo: 'https://example.com/logos/updated-admin.png'
        }, null, 2),
        bodyExplain: {
          adminsName_en: 'Administration name in English (optional)',
          adminsName_ar: 'Administration name in Arabic (optional)',
          slug: 'Unique slug for URL (lowercase with hyphens only, optional)',
          logo: 'Logo image URL (must be valid URL, optional)',
          managerFirstName_en: 'Manager first name in English (optional)',
          managerSecondName_en: 'Manager second name in English (optional)',
          managerThirdName_en: 'Manager third name in English (optional)',
          managerFirstName_ar: 'Manager first name in Arabic (optional)',
          managerSecondName_ar: 'Manager second name in Arabic (optional)',
          managerThirdName_ar: 'Manager third name in Arabic (optional)'
        }
      }
    },
    {
      id: 'admin-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/administrations/:administrationId',
      description: 'Delete administration (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          administrationId: 'da2758da-0e26-482e-b74f-8b80598f419a'
        },
        body: ''
      }
    }
  ],
  'Faculty': [
    {
      id: 'faculty-list',
      name: 'Get All',
      method: 'GET',
      path: '/faculties',
      description: 'Get all faculties',
      isProtected: false,
      params: ['page', 'limit', 'search'],
      example: {
        body: ''
      }
    },
    {
      id: 'faculty-detail',
      name: 'Get Details',
      method: 'GET',
      path: '/faculties/:facultyId',
      description: 'Get faculty details (Returns 404 if faculty is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          facultyId: '8083308c-93ec-4e4d-b665-d63c4f0115bf'
        },
        body: ''
      }
    },
    {
      id: 'faculty-create',
      name: 'Create',
      method: 'POST',
      path: '/faculties',
      description: 'Create a new faculty',
      isProtected: true,
      example: {
        body: JSON.stringify({
          ownerId: 'aeaa3407-01df-4cba-897e-457adf180cb4',
          faculty_name_en: 'Faculty of Engineering',
          faculty_name_ar: 'كلية الهندسة',
          slug: 'engineering-faculty-001',
          mobile: '+249987654321',
          address_en: 'Khartoum, Sudan',
          address_ar: 'الخرطوم، السودان',
          student_count: 500,
          graduation_count: 100,
          dean_first_name_en: 'Ahmed',
          dean_second_name_en: 'Hassan',
          dean_third_name_en: 'Karim',
          dean_first_name_ar: 'أحمد',
          dean_second_name_ar: 'حسن',
          dean_third_name_ar: 'كريم'
        }, null, 2),
        bodyExplain: {
          ownerId: 'Owner ID (admin user ID who owns this faculty, required)',
          faculty_name_en: 'Faculty name in English (required)',
          faculty_name_ar: 'Faculty name in Arabic (required)',
          slug: 'Unique slug for URL (lowercase with hyphens/numbers only, required - must be unique)',
          mobile: 'Faculty mobile number (required - must be unique)',
          address_en: 'Faculty address in English (required)',
          address_ar: 'Faculty address in Arabic (required)',
          student_count: 'Number of students (positive integer, required)',
          graduation_count: 'Number of graduates (positive integer, required)',
          dean_first_name_en: 'Dean first name in English (required)',
          dean_second_name_en: 'Dean second name in English (required)',
          dean_third_name_en: 'Dean third name in English (required)',
          dean_first_name_ar: 'Dean first name in Arabic (required)',
          dean_second_name_ar: 'Dean second name in Arabic (required)',
          dean_third_name_ar: 'Dean third name in Arabic (required)'
        }
      }
    },
    {
      id: 'faculty-update',
      name: 'Update',
      method: 'PUT',
      path: '/faculties/:facultyId',
      description: 'Update faculty information (Returns 410 if faculty is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          facultyId: '8083308c-93ec-4e4d-b665-d63c4f0115bf'
        },
        body: JSON.stringify({
          faculty_name_en: 'Faculty of Engineering Sciences',
          faculty_name_ar: 'كلية العلوم الهندسية'
        }, null, 2),
        bodyExplain: {
          faculty_name_en: 'Faculty name in English (optional)',
          faculty_name_ar: 'Faculty name in Arabic (optional)',
          slug: 'Unique slug for URL (optional)',
          mobile: 'Faculty mobile number (optional)',
          dean_first_name_en: 'Dean first name in English (optional)',
          dean_second_name_en: 'Dean second name in English (optional)',
          dean_third_name_en: 'Dean third name in English (optional)',
          dean_first_name_ar: 'Dean first name in Arabic (optional)',
          dean_second_name_ar: 'Dean second name in Arabic (optional)',
          dean_third_name_ar: 'Dean third name in Arabic (optional)'
        }
      }
    },
    {
      id: 'faculty-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/faculties/:facultyId',
      description: 'Delete a faculty (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          facultyId: '8083308c-93ec-4e4d-b665-d63c4f0115bf'
        },
        body: ''
      }
    }
  ],
  'Departments': [
    {
      id: 'dept-list',
      name: 'Get Dept by Faculty',
      method: 'GET',
      path: '/departments',
      description: 'Get all departments for a specific faculty',
      isProtected: false,
      params: ['facultyId (required)', 'page', 'limit', 'search'],
      example: {
        params: {
          facultyId: '8083308c-93ec-4e4d-b665-d63c4f0115bf',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          facultyId: 'Faculty ID (required query parameter) - Get from Faculty Get All endpoint'
        }
      }
    },
    {
      id: 'dept-detail',
      name: 'Get Details',
      method: 'GET',
      path: '/departments/:deptId',
      description: 'Get department details (Returns 404 if department is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          deptId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5'
        },
        body: ''
      }
    },
    {
      id: 'dept-create',
      name: 'Create',
      method: 'POST',
      path: '/departments',
      description: 'Create a new department',
      isProtected: true,
      example: {
        body: JSON.stringify({
          faculty_id: '8083308c-93ec-4e4d-b665-d63c4f0115bf',
          dept_name_en: 'Computer Science',
          dept_name_ar: 'علوم الحاسبوب',
          slug: 'computer-science-dept-001',
          managerFirstName_en: 'Sara',
          managerSecondName_en: 'Ahmed',
          managerThirdName_en: 'Mohamed',
          managerFirstName_ar: 'سارة',
          managerSecondName_ar: 'أحمد',
          managerThirdName_ar: 'محمد',
          student_count: 300,
          staff_count: 50
        }, null, 2),
        bodyExplain: {
          faculty_id: 'Faculty ID (must exist, required) - Get from Faculty Get All endpoint',
          dept_name_en: 'Department name in English (required)',
          dept_name_ar: 'Department name in Arabic (required)',
          slug: 'Unique slug for URL (lowercase with hyphens only, required)',
          managerFirstName_en: 'Manager first name in English (2-50 characters, required)',
          managerSecondName_en: 'Manager second name in English (2-50 characters, required)',
          managerThirdName_en: 'Manager third name in English (2-50 characters, required)',
          managerFirstName_ar: 'Manager first name in Arabic (2-50 characters, required)',
          managerSecondName_ar: 'Manager second name in Arabic (2-50 characters, required)',
          managerThirdName_ar: 'Manager third name in Arabic (2-50 characters, required)',
          student_count: 'Number of students (positive integer, required)',
          staff_count: 'Number of staff members (positive integer, required)'
        }
      }
    },
    {
      id: 'dept-update',
      name: 'Update',
      method: 'PUT',
      path: '/departments/:deptId',
      description: 'Update department information (Returns 410 if department is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          deptId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5'
        },
        body: JSON.stringify({
          dept_name_en: 'Computer Science & Engineering',
          dept_name_ar: 'علوم الحاسبوب والهندسة'
        }, null, 2),
        bodyExplain: {
          dept_name_en: 'Department name in English (optional)',
          dept_name_ar: 'Department name in Arabic (optional)',
          slug: 'Unique slug for URL (optional)',
          managerFirstName_en: 'Manager first name in English (2-50 characters, optional)',
          managerSecondName_en: 'Manager second name in English (2-50 characters, optional)',
          managerThirdName_en: 'Manager third name in English (2-50 characters, optional)',
          managerFirstName_ar: 'Manager first name in Arabic (2-50 characters, optional)',
          managerSecondName_ar: 'Manager second name in Arabic (2-50 characters, optional)',
          managerThirdName_ar: 'Manager third name in Arabic (2-50 characters, optional)',
          student_count: 'Number of students (positive integer, optional)',
          staff_count: 'Number of staff members (positive integer, optional)'
        }
      }
    },
    {
      id: 'dept-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/departments/:deptId',
      description: 'Delete a department (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          deptId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5'
        },
        body: ''
      }
    }
  ],
  'Centers': [
    {
      id: 'center-list',
      name: 'Get All',
      method: 'GET',
      path: '/centers',
      description: 'Get all centers',
      isProtected: false,
      params: ['page', 'limit', 'search'],
      example: {
        body: ''
      }
    },
    {
      id: 'center-detail',
      name: 'Get Details',
      method: 'GET',
      path: '/centers/:centerId',
      description: 'Get center details (Returns 404 if center is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          centerId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5'
        },
        body: ''
      }
    },
    {
      id: 'center-create',
      name: 'Create',
      method: 'POST',
      path: '/centers',
      description: 'Create a new center',
      isProtected: true,
      example: {
        body: JSON.stringify({
          centerName_en: 'Innovation Center',
          centerName_ar: 'مركز الابتكار',
          slug: 'innovation-center',
          logo: 'https://example.com/logos/innovation-center.png',
          managerFirstName_en: 'Ahmed',
          managerSecondName_en: 'Hassan',
          managerThirdName_en: 'Karim',
          managerFirstName_ar: 'أحمد',
          managerSecondName_ar: 'حسن',
          managerThirdName_ar: 'كريم'
        }, null, 2),
        bodyExplain: {
          centerName_en: 'Center name in English (3-255 characters, required)',
          centerName_ar: 'Center name in Arabic (3-255 characters, required)',
          slug: 'Unique slug for URL (3-100 chars, lowercase letters/numbers/hyphens only, required)',
          logo: 'Logo image URL (must be valid URL, required)',
          managerFirstName_en: 'Manager first name in English (2-100 characters, required)',
          managerSecondName_en: 'Manager second name in English (2-100 characters, required)',
          managerThirdName_en: 'Manager third name in English (2-100 characters, required)',
          managerFirstName_ar: 'Manager first name in Arabic (2-100 characters, required)',
          managerSecondName_ar: 'Manager second name in Arabic (2-100 characters, required)',
          managerThirdName_ar: 'Manager third name in Arabic (2-100 characters, required)'
        }
      }
    },
    {
      id: 'center-update',
      name: 'Update',
      method: 'PUT',
      path: '/centers/:centerId',
      description: 'Update center information (Returns 410 if center is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          centerId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5'
        },
        body: JSON.stringify({
          centerName_en: 'Updated Innovation Center',
          centerName_ar: 'مركز الابتكار المحدث'
        }, null, 2),
        bodyExplain: {
          centerName_en: 'Center name in English (3-255 characters, optional)',
          centerName_ar: 'Center name in Arabic (3-255 characters, optional)',
          slug: 'Unique slug for URL (optional) - Must be unique',
          logo: 'Logo image URL (optional)',
          managerFirstName_en: 'Manager first name in English (optional)',
          managerSecondName_en: 'Manager second name in English (optional)',
          managerFirstName_ar: 'Manager first name in Arabic (optional)',
          managerSecondName_ar: 'Manager second name in Arabic (optional)'
        }
      }
    },
    {
      id: 'center-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/centers/:centerId',
      description: 'Delete a center (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          centerId: 'cf83d3a4-dbcd-4ad8-a4fe-7d76195a35f5'
        },
        body: ''
      }
    }
  ],
  'Units': [
    {
      id: 'unit-list',
      name: 'Get All',
      method: 'GET',
      path: '/units',
      description: 'Get all university units with advanced filtering by owner type and entity ID',
      isProtected: false,
      params: ['page', 'limit', 'ownerType', 'facultyId', 'centerId', 'administrationId', 'departmentId', 'unitId', 'ownerId', 'is_active'],
      example: {
        params: {
          page: '1',
          limit: '10',
          ownerType: 'FACULTY'
        },
        body: '',
        bodyExplain: {
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          ownerType: 'Filter by owner type: FACULTY, ADMINISTRATION, UNIVERSITY, CENTER, UNIT (optional)',
          facultyId: 'Get units for specific faculty (optional)',
          centerId: 'Get units for specific center (optional)',
          administrationId: 'Get units for specific administration (optional)',
          departmentId: 'Get units for specific department (optional)',
          unitId: 'Filter by specific unit ID (optional)',
          ownerId: 'Filter by owner ID (optional)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'unit-detail',
      name: 'Get Details',
      method: 'GET',
      path: '/units/:unitId',
      description: 'Get unit details (Returns 404 if unit is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          unitId: 'unit-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'unit-create',
      name: 'Create',
      method: 'POST',
      path: '/units',
      description: 'Create a new unit',
      isProtected: true,
      example: {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          name: 'Engineering Unit',
          description: 'Main engineering unit'
        }, null, 2),
        bodyExplain: {
          name: 'Name of the unit (required)',
          description: 'Description of the unit (required)'
        }
      }
    },
    {
      id: 'unit-update',
      name: 'Update',
      method: 'PUT',
      path: '/units/:unitId',
      description: 'Update unit information (Returns 410 if unit is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          unitId: 'unit-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: JSON.stringify({
          name: 'Updated Unit Name',
          description: 'Updated description'
        }, null, 2),
        bodyExplain: {
          name: 'Updated unit name (optional)',
          description: 'Updated description (optional)'
        }
      }
    },
    {
      id: 'unit-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/units/:unitId',
      description: 'Delete a unit (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          unitId: 'unit-uuid-here'
        },
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MmFiMGJhLWViYTktNDg3Ny1iMmJmLTFiOTY2M2I0MjJlNiIsImVtYWlsIjoiam9mZmhuLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJNT0RFUkFUT1IiLCJvd25lcklkIjoiODFlYzc1MmItZDkzZi00ODhhLTg1ODItZWVjYjc0NmFiNTVhIiwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzc2MzQ5NTM0LCJleHAiOjE3NzYzNTA0MzR9.n2z6sOxfXU6e7SfIl1ggHe2AaLbLHovvvxCn12zYFwI'
        },
        body: ''
      }
    }
  ],
  'Events': [
    {
      id: 'event-get-all',
      name: 'Get All Events',
      method: 'GET',
      path: '/events',
      description: 'Get all events (paginated) - Public access. REQUIRES at least one filter: ownerType, ownerId, facultyId, administrationId, centerId, or unitId',
      isProtected: false,
      params: ['ownerType', 'ownerId', 'facultyId', 'administrationId', 'centerId', 'unitId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          ownerType: 'ADMINISTRATION',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          ownerType: 'Filter by owner type (REQUIRED): FACULTY, ADMINISTRATION, UNIVERSITY, CENTER, UNIT',
          ownerId: 'Filter by owner ID (alternative to ownerType)',
          facultyId: 'Filter by faculty ID',
          administrationId: 'Filter by administration ID',
          centerId: 'Filter by center ID',
          unitId: 'Filter by unit ID',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-get-by-id',
      name: 'Get Event by ID',
      method: 'GET',
      path: '/events/:eventId',
      description: 'Get single event by ID - Public access (Returns 404 if event is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          eventId: 'event-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'event-by-owner',
      name: 'Get by Owner ID',
      method: 'GET',
      path: '/events',
      description: 'Get all events for a specific owner (alternative endpoint)',
      isProtected: false,
      params: ['ownerId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          ownerId: 'aeaa3407-01df-4cba-897e-457adf180cb4',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          ownerId: 'Owner ID (required) - Admin user ID - Example: ?ownerId=aeaa3407-01df-4cba-897e-457adf180cb4',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-by-faculty',
      name: 'Get by Faculty',
      method: 'GET',
      path: '/events',
      description: 'Get all events for a specific faculty - Public access',
      isProtected: false,
      params: ['facultyId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          facultyId: 'faculty-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          facultyId: 'Faculty ID (required) - Example: ?facultyId=f1234567-89ab-cdef-0123-456789abcdef',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-by-administration',
      name: 'Get by Administration',
      method: 'GET',
      path: '/events',
      description: 'Get all events for a specific administration - Public access',
      isProtected: false,
      params: ['administrationId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          administrationId: 'admin-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          administrationId: 'Administration ID (required) - Example: ?administrationId=admin-456',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-by-center',
      name: 'Get by Center',
      method: 'GET',
      path: '/events',
      description: 'Get all events for a specific center - Public access',
      isProtected: false,
      params: ['centerId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          centerId: 'center-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          centerId: 'Center ID (required) - Example: ?centerId=c1234567-89ab-cdef-0123-456789abcdef',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-by-unit',
      name: 'Get by Unit',
      method: 'GET',
      path: '/events',
      description: 'Get all events for a specific unit - Public access',
      isProtected: false,
      params: ['unitId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          unitId: 'unit-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          unitId: 'Unit ID (required) - Example: ?unitId=unit-321',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-by-university',
      name: 'Get by University',
      method: 'GET',
      path: '/events',
      description: 'Get all events for the university - Public access',
      isProtected: false,
      params: ['ownerType', 'page', 'limit', 'is_active'],
      example: {
        params: {
          ownerType: 'UNIVERSITY',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          ownerType: 'Filter by owner type: UNIVERSITY (required)',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'event-create',
      name: 'Create Event',
      method: 'POST',
      path: '/events',
      description: 'Create new event',
      isProtected: true,
      example: {
        body: JSON.stringify({
          ownerId: 'aeaa3407-01df-4cba-897e-457adf180cb4',
          title_en: 'Conference 2024',
          title_ar: 'مؤتمر 2024',
          slug: 'conference-2024-tech-summit',
          thumbnail: 'https://example.com/images/conference-2024.jpg',
          location_en: 'Khartoum Convention Center',
          location_ar: 'مركز الخرطوم للمؤتمرات',
          publishedAt: '2026-04-17T13:28:25.880Z',
          details_en: 'Annual international conference on technology and innovation',
          details_ar: 'المؤتمر الدولي السنوي حول التكنولوجيا والابتكار',
          eventDate: '2026-05-17T13:28:25.880Z',
          startTime: '2026-05-17T13:28:25.880Z',
          endTime: '2026-05-17T21:28:25.880Z',
          images: [
            'https://example.com/images/event-1.jpg',
            'https://example.com/images/event-2.jpg',
            'https://example.com/images/event-3.jpg',
            'https://example.com/images/event-4.jpg'
          ]
        }, null, 2),
        bodyExplain: {
          ownerId: 'Owner ID (admin user ID, required)',
          title_en: 'Event title in English (required)',
          title_ar: 'Event title in Arabic (required)',
          slug: 'Unique slug for URL (lowercase with hyphens only, required)',
          thumbnail: 'Event thumbnail image URL (required)',
          location_en: 'Event location in English (required)',
          location_ar: 'Event location in Arabic (required)',
          publishedAt: 'Publication date in ISO format (required)',
          details_en: 'Event details in English (required)',
          details_ar: 'Event details in Arabic (required)',
          eventDate: 'Event date in ISO format (required)',
          startTime: 'Event start time in ISO format (required)',
          endTime: 'Event end time in ISO format (required)',
          images: 'Array of event image URLs (optional)'
        }
      }
    },
    {
      id: 'event-update',
      name: 'Update',
      method: 'PUT',
      path: '/events/:eventId',
      description: 'Update event information',
      isProtected: true,
      example: {
        pathParams: {
          eventId: 'event-uuid-here'
        },
        body: JSON.stringify({
          title_en: 'Updated Event Title',
          title_ar: 'عنوان الحدث المحدث',
          location_en: 'Updated Location',
          location_ar: 'الموقع المحدث'
        }, null, 2),
        bodyExplain: {
          title_en: 'Event title in English (optional)',
          title_ar: 'Event title in Arabic (optional)',
          slug: 'Unique slug for URL (optional)',
          thumbnail: 'Event thumbnail image URL (optional)',
          location_en: 'Event location in English (optional)',
          location_ar: 'Event location in Arabic (optional)',
          details_en: 'Event details in English (optional)',
          details_ar: 'Event details in Arabic (optional)',
          eventDate: 'Event date in ISO format (optional)',
          startTime: 'Event start time in ISO format (optional)',
          endTime: 'Event end time in ISO format (optional)'
        }
      }
    },
    {
      id: 'event-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/events/:eventId',
      description: 'Delete an event (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          eventId: 'event-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'event-restore',
      name: 'Restore',
      method: 'POST',
      path: '/events/:eventId/restore',
      description: 'Restore a soft-deleted event (only owner can restore)',
      isProtected: true,
      example: {
        pathParams: {
          eventId: 'event-uuid-here'
        },
        body: ''
      }
    }
  ],
  'News': [
    {
      id: 'news-get-all',
      name: 'Get All News',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles (paginated) - Public access. REQUIRES at least one filter: ownerType, ownerId, facultyId, administrationId, centerId, or unitId',
      isProtected: false,
      params: ['ownerType', 'ownerId', 'facultyId', 'administrationId', 'centerId', 'unitId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          ownerType: 'ADMINISTRATION',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          ownerType: 'Filter by owner type (REQUIRED): FACULTY, ADMINISTRATION, UNIVERSITY, CENTER, UNIT',
          ownerId: 'Filter by owner ID (alternative to ownerType)',
          facultyId: 'Filter by faculty ID',
          administrationId: 'Filter by administration ID',
          centerId: 'Filter by center ID',
          unitId: 'Filter by unit ID',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-get-by-id',
      name: 'Get News by ID',
      method: 'GET',
      path: '/news/:newsId',
      description: 'Get single news article by ID - Public access (Returns 404 if news is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          newsId: 'news-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'news-by-owner',
      name: 'Get by Owner ID',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles for a specific owner (alternative endpoint)',
      isProtected: false,
      params: ['ownerId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          ownerId: 'aeaa3407-01df-4cba-897e-457adf180cb4',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          ownerId: 'Owner ID (required) - Admin user ID - Example: ?ownerId=aeaa3407-01df-4cba-897e-457adf180cb4',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-by-faculty',
      name: 'Get by Faculty',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles for a specific faculty - Public access',
      isProtected: false,
      params: ['facultyId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          facultyId: 'faculty-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          facultyId: 'Faculty ID (required) - Example: ?facultyId=f1234567-89ab-cdef-0123-456789abcdef',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-by-administration',
      name: 'Get by Administration',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles for a specific administration - Public access',
      isProtected: false,
      params: ['administrationId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          administrationId: 'admin-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          administrationId: 'Administration ID (required) - Example: ?administrationId=admin-456',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-by-center',
      name: 'Get by Center',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles for a specific center - Public access',
      isProtected: false,
      params: ['centerId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          centerId: 'center-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          centerId: 'Center ID (required) - Example: ?centerId=c1234567-89ab-cdef-0123-456789abcdef',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-by-unit',
      name: 'Get by Unit',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles for a specific unit - Public access',
      isProtected: false,
      params: ['unitId', 'page', 'limit', 'is_active'],
      example: {
        params: {
          unitId: 'unit-uuid-here',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          unitId: 'Unit ID (required) - Example: ?unitId=unit-321',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-by-university',
      name: 'Get by University',
      method: 'GET',
      path: '/news',
      description: 'Get all news articles for the university - Public access',
      isProtected: false,
      params: ['ownerType', 'page', 'limit', 'is_active'],
      example: {
        params: {
          ownerType: 'UNIVERSITY',
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          ownerType: 'Filter by owner type: UNIVERSITY (required)',
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          is_active: 'Filter by active status: true or false (optional)'
        }
      }
    },
    {
      id: 'news-create',
      name: 'Create News',
      method: 'POST',
      path: '/news',
      description: 'Create new news article',
      isProtected: true,
      example: {
        body: JSON.stringify({
          ownerId: 'aeaa3407-01df-4cba-897e-457adf180cb4',
          title_en: 'University News 2024',
          title_ar: 'أخبار الجامعة 2024',
          slug: 'university-news-2024-announcement',
          thumbnail: 'https://example.com/images/news-2024.jpg',
          content_en: 'Important university news and announcements for 2024',
          content_ar: 'أخبار وإعلانات الجامعة المهمة لعام 2024',
          publishedAt: '2026-04-17T13:28:25.880Z',
          summary_en: 'Brief summary in English',
          summary_ar: 'ملخص موجز بالعربية',
          images: [
            'https://example.com/images/news-1.jpg',
            'https://example.com/images/news-2.jpg',
            'https://example.com/images/news-3.jpg'
          ]
        }, null, 2),
        bodyExplain: {
          ownerId: 'Admin/Owner ID (required)',
          title_en: 'News title in English (required, 3-200 chars)',
          title_ar: 'News title in Arabic (required, 3-200 chars)',
          slug: 'Unique slug for URL (lowercase with hyphens only, required)',
          thumbnail: 'News thumbnail image URL (required)',
          content_en: 'News content in English (required)',
          content_ar: 'News content in Arabic (required)',
          publishedAt: 'Publication date in ISO 8601 format (required)',
          summary_en: 'Brief summary in English (optional)',
          summary_ar: 'Brief summary in Arabic (optional)',
          images: 'Array of image URLs (optional)'
        }
      }
    },
    {
      id: 'news-update',
      name: 'Update',
      method: 'PUT',
      path: '/news/:newsId',
      description: 'Update news article information',
      isProtected: true,
      example: {
        pathParams: {
          newsId: 'news-uuid-here'
        },
        body: JSON.stringify({
          title_en: 'Updated News Title',
          title_ar: 'عنوان الخبر المحدث',
          slug: 'updated-news-slug',
          thumbnail: 'https://example.com/images/updated-news.jpg',
          content_en: 'Updated news content in English',
          content_ar: 'محتوى الخبر المحدث بالعربية',
          summary_en: 'Updated summary in English',
          summary_ar: 'ملخص محدث بالعربية',
          publishedAt: '2026-04-18T13:28:25.880Z',
          images: [
            'https://example.com/images/updated-news-1.jpg',
            'https://example.com/images/updated-news-2.jpg'
          ]
        }, null, 2),
        bodyExplain: {
          title_en: 'News title in English (optional)',
          title_ar: 'News title in Arabic (optional)',
          slug: 'Unique slug for URL (optional)',
          thumbnail: 'News thumbnail image URL (optional)',
          content_en: 'News content in English (optional)',
          content_ar: 'News content in Arabic (optional)',
          summary_en: 'Brief summary in English (optional)',
          summary_ar: 'Brief summary in Arabic (optional)',
          publishedAt: 'Publication date in ISO 8601 format (optional)',
          images: 'Array of image URLs (optional)'
        }
      }
    },
    {
      id: 'news-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/news/:newsId',
      description: 'Delete a news article (Returns 400 if already deleted, Returns 200 on success)',
      isProtected: true,
      example: {
        pathParams: {
          newsId: 'news-uuid-here'
        },
        body: ''
      }
    },
    {
      id: 'news-restore',
      name: 'Restore',
      method: 'POST',
      path: '/news/:newsId/restore',
      description: 'Restore a soft-deleted news article (only owner can restore)',
      isProtected: true,
      example: {
        pathParams: {
          newsId: 'news-uuid-here'
        },
        body: ''
      }
    }
  ],
  'University': [
    {
      id: 'university-get-all',
      name: 'Get All Universities',
      method: 'GET',
      path: '/university',
      description: 'Get all universities in the system - Public access',
      isProtected: false,
      params: ['page', 'limit'],
      example: {
        params: {
          page: '1',
          limit: '10'
        },
        body: '',
        bodyExplain: {
          page: 'Page number (optional, default: 1)',
          limit: 'Records per page (optional, default: 10)',
          note: 'No authentication required. Returns all active universities.'
        }
      }
    },
    {
      id: 'university-get-by-id',
      name: 'Get University by ID',
      method: 'GET',
      path: '/university/:universityId',
      description: 'Get single university by ID - Public access (Returns 404 if university is deleted)',
      isProtected: false,
      example: {
        pathParams: {
          universityId: 'uni-001-abc-def-ghi'
        },
        body: ''
      }
    },
    {
      id: 'university-create',
      name: 'Create',
      method: 'POST',
      path: '/university',
      description: 'Create a new university (Protected - Requires ownerId)',
      isProtected: true,
      example: {
        body: JSON.stringify({
          ownerId: 'admin-owner-uuid-here',
          universityName_en: 'Arabian Gulf University',
          universityName_ar: 'جامعة الخليج العربي',
          email: 'info@agu.edu.sd',
          logo: 'https://example.com/logo.png',
          vision_en: 'To be a leading research university',
          vision_ar: 'أن تكون جامعة رائدة في البحث العلمي',
          mission_en: 'To advance knowledge and education',
          mission_ar: 'تعزيز المعرفة والتعليم',
          uni_phone_number: '+249123456789',
          president_firstName_en: 'Ahmed',
          president_secondName_en: 'Mohammed',
          president_thirdName_en: 'Ali',
          president_firstName_ar: 'أحمد',
          president_secondName_ar: 'محمد',
          president_thirdName_ar: 'علي',
          president_word_en: 'Welcome to our university',
          president_word_ar: 'مرحبا بكم في جامعتنا',
          president_Image: 'https://example.com/president.jpg',
          president_About_en: 'Dr. Ahmed is an accomplished academic leader',
          president_About_ar: 'د. أحمد قائد أكاديمي بارز'
        }, null, 2),
        bodyExplain: {
          ownerId: 'Owner/Admin ID (UUID, required - must exist in database)',
          universityName_en: 'University name in English (required, 3-200 chars)',
          universityName_ar: 'University name in Arabic (required, 3-200 chars)',
          email: 'Official university email (required, valid email)',
          logo: 'Logo URL (required)',
          vision_en: 'University vision in English (optional)',
          vision_ar: 'University vision in Arabic (optional)',
          mission_en: 'University mission in English (optional)',
          mission_ar: 'University mission in Arabic (optional)',
          uni_phone_number: 'University phone number (optional)',
          president_firstName_en: "President's first name in English (required)",
          president_secondName_en: "President's second name in English (required)",
          president_thirdName_en: "President's third name in English (optional)",
          president_firstName_ar: "President's first name in Arabic (required)",
          president_secondName_ar: "President's second name in Arabic (required)",
          president_thirdName_ar: "President's third name in Arabic (optional)",
          president_word_en: "President's greeting/word in English (optional)",
          president_word_ar: "President's greeting/word in Arabic (optional)",
          president_Image: "President's photo URL (optional)",
          president_About_en: 'About president in English (optional)',
          president_About_ar: 'About president in Arabic (optional)'
        }
      }
    },
    {
      id: 'university-update',
      name: 'Update',
      method: 'PUT',
      path: '/university/:universityId',
      description: 'Update university information (Owner/Admin only - Returns 410 if university is deleted)',
      isProtected: true,
      example: {
        pathParams: {
          universityId: 'uni-001-abc-def-ghi'
        },
        body: JSON.stringify({
          universityName_en: 'Updated University Name',
          universityName_ar: 'اسم الجامعة المحدث',
          email: 'newemail@agu.edu.sd',
          logo: 'https://example.com/new-logo.png',
          vision_en: 'Updated vision statement',
          vision_ar: 'بيان الرؤية المحدث',
          mission_en: 'Updated mission statement',
          mission_ar: 'بيان المهمة المحدث',
          uni_phone_number: '+249987654321',
          president_firstName_en: 'Mohamed',
          president_secondName_en: 'Ahmed',
          president_thirdName_en: 'Hassan',
          president_firstName_ar: 'محمد',
          president_secondName_ar: 'أحمد',
          president_thirdName_ar: 'حسن',
          president_word_en: 'Updated welcome message',
          president_word_ar: 'رسالة الترحيب المحدثة',
          president_Image: 'https://example.com/new-president.jpg',
          president_About_en: 'Dr. Mohamed is a distinguished academic',
          president_About_ar: 'د. محمد أكاديمي مميز'
        }, null, 2),
        bodyExplain: {
          universityName_en: 'University name in English (optional)',
          universityName_ar: 'University name in Arabic (optional)',
          email: 'University email address (optional)',
          logo: 'Logo URL (optional)',
          vision_en: 'University vision in English (optional)',
          vision_ar: 'University vision in Arabic (optional)',
          mission_en: 'University mission in English (optional)',
          mission_ar: 'University mission in Arabic (optional)',
          uni_phone_number: 'University phone number (optional)',
          president_firstName_en: "President's first name in English (optional)",
          president_secondName_en: "President's second name in English (optional)",
          president_thirdName_en: "President's third name in English (optional)",
          president_firstName_ar: "President's first name in Arabic (optional)",
          president_secondName_ar: "President's second name in Arabic (optional)",
          president_thirdName_ar: "President's third name in Arabic (optional)",
          president_word_en: "President's greeting in English (optional)",
          president_word_ar: "President's greeting in Arabic (optional)",
          president_Image: "President's photo URL (optional)",
          president_About_en: 'About president in English (optional)',
          president_About_ar: 'About president in Arabic (optional)'
        }
      }
    },
    {
      id: 'university-delete',
      name: 'Delete',
      method: 'DELETE',
      path: '/university/:universityId',
      description: 'Delete university (soft delete - Owner/Admin only - Returns 400 if already deleted)',
      isProtected: true,
      example: {
        pathParams: {
          universityId: 'uni-001-abc-def-ghi'
        },
        body: ''
      }
    }
  ]

}

export const getBaseUrl = (environment) => {
  return environment === 'production'
    ? 'https://api.example.com/api/v1.0'
    : 'http://localhost:3000/api/v1.0'
}

export const getMethodColor = (method) => {
  switch (method) {
    case 'GET':
      return 'bg-blue-100 text-blue-800'
    case 'POST':
      return 'bg-green-100 text-green-800'
    case 'PUT':
      return 'bg-yellow-100 text-yellow-800'
    case 'PATCH':
      return 'bg-purple-100 text-purple-800'
    case 'DELETE':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
