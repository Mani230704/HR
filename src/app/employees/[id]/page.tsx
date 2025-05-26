
import { getEmployeeById } from '@/lib/api';
import type { User } from '@/lib/types';
import Image from 'next/image';
import { UserAvatar } from '@/components/UserAvatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Briefcase, MapPin, Building, Star, Users, MessageSquare } from 'lucide-react';
import { AiAssignmentSection } from './AiAssignmentSection';
import { notFound } from 'next/navigation';
import { BookmarkToggle } from './BookmarkToggle';
import { unstable_noStore as noStore } from 'next/cache';

export default async function EmployeeProfilePage({ params }: { params: { id: string } }) {
  noStore();
  const employee = await getEmployeeById(params.id);

  if (!employee) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-primary to-accent" />
          <div className="absolute flex items-end p-6 transform -translate-x-1/2 bottom-[-48px] left-1/2 sm:left-auto sm:translate-x-0 sm:bottom-6 sm:left-6">
            <UserAvatar 
              src={employee.image} 
              alt={`${employee.firstName} ${employee.lastName}`}
              fallbackInitials={`${employee.firstName[0]}${employee.lastName[0]}`}
              className="w-32 h-32 border-4 border-background shadow-lg"
            />
            <div className="ml-6 text-background sm:text-foreground"> {/* Text color changes for small screens */}
              <h1 className="text-3xl font-bold">{employee.firstName} {employee.lastName}</h1>
              <p className="text-md">{employee.company.title}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <BookmarkToggle employee={employee} />
          </div>
        </div>
        
        <div className="pt-20 pb-6 px-6 sm:pt-8"> {/* Adjusted padding top */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="secondary">{employee.company.department}</Badge>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {employee.performanceRating}/5 Rating</span>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview"><Users className="w-4 h-4 mr-2 sm:inline-block hidden" />Overview</TabsTrigger>
          <TabsTrigger value="projects"><Briefcase className="w-4 h-4 mr-2 sm:inline-block hidden" />Projects</TabsTrigger>
          <TabsTrigger value="feedback"><MessageSquare className="w-4 h-4 mr-2 sm:inline-block hidden" />Feedback & AI</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
              <CardDescription>General information and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold">Contact Information</h3>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> <a href={`mailto:${employee.email}`} className="hover:text-primary">{employee.email}</a></li>
                    <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> <a href={`tel:${employee.phone}`} className="hover:text-primary">{employee.phone}</a></li>
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {`${employee.address.address}, ${employee.address.city}, ${employee.address.state} ${employee.address.postalCode}`}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Company Details</h3>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Building className="w-4 h-4 shrink-0" /> {employee.company.name}</li>
                    <li className="flex items-center gap-2"><Briefcase className="w-4 h-4 shrink-0" /> {employee.company.title}</li>
                    <li className="flex items-center gap-2"><Users className="w-4 h-4 shrink-0" /> {employee.company.department}</li>
                    <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> {`${employee.company.address.address}, ${employee.company.address.city}`}</li>
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t">
                 <h3 className="font-semibold">Additional Info</h3>
                 <dl className="mt-1 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 text-sm">
                    <div className="sm:col-span-1">
                        <dt className="text-muted-foreground">Username</dt>
                        <dd>{employee.username}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-muted-foreground">Age</dt>
                        <dd>{employee.age}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-muted-foreground">Gender</dt>
                        <dd className="capitalize">{employee.gender}</dd>
                    </div>
                     <div className="sm:col-span-1">
                        <dt className="text-muted-foreground">Birth Date</dt>
                        <dd>{new Date(employee.birthDate).toLocaleDateString()}</dd>
                    </div>
                 </dl>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Current and past project involvements.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for project list. Could integrate AI suggestions here. */}
              <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg border-muted-foreground/30">
                <Briefcase className="w-12 h-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">No project data available yet.</p>
                <p className="text-xs text-muted-foreground">AI-suggested projects will appear here after feedback analysis.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <AiAssignmentSection employee={employee} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
