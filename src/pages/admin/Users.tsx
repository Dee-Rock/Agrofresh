
import { useState } from "react";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/admin/AdminLayout";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "Kwame Asante",
      email: "kwame@example.com",
      role: "Farmer",
      status: "Active",
      location: "Kumasi",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Akosua Mensah",
      email: "akosua@restaurant.com",
      role: "Vendor",
      status: "Active",
      location: "Accra",
      joinDate: "2024-02-20",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Kofi Osei",
      email: "kofi@farm.gh",
      role: "Farmer",
      status: "Inactive",
      location: "Tamale",
      joinDate: "2024-01-08",
      lastActive: "1 week ago"
    },
    {
      id: 4,
      name: "Ama Boateng",
      email: "ama@hostel.com",
      role: "Vendor",
      status: "Active",
      location: "Cape Coast",
      joinDate: "2024-03-01",
      lastActive: "5 hours ago"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground";
  };

  const getRoleColor = (role: string) => {
    return role === "Farmer" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage farmers and vendors on your platform</p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            <CardDescription>A list of all registered users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{user.location}</p>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">Last active: {user.lastActive}</p>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Users;
