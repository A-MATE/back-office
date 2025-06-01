"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "@/components/icons";
import { Input } from "../ui/input";

const notificationsFormSchema = z.object({
  emailUpdates: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
  sidebarLayout: z.enum(["expanded", "collapsed", "auto"], {
    required_error: "Please select a sidebar layout.",
  }),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function SettingsForm() {
  const { toast } = useToast();

  // Notifications form
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailUpdates: true,
      pushNotifications: false,
      marketingEmails: false,
    },
  });

  // Appearance form
  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      sidebarLayout: "auto",
    },
  });

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  }

  function onAppearanceSubmit(data: AppearanceFormValues) {
    toast({
      title: "Appearance settings updated",
      description: "Your appearance preferences have been saved.",
    });
  }

  return (
    <Tabs defaultValue="notifications" className="space-y-4">
      <TabsList>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Configure how you receive notifications and updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...notificationsForm}>
              <form
                onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={notificationsForm.control}
                  name="emailUpdates"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Email Updates
                        </FormLabel>
                        <FormDescription>
                          Receive emails about account activity and updates.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Push Notifications
                        </FormLabel>
                        <FormDescription>
                          Receive push notifications in your browser or mobile
                          app.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Marketing Emails
                        </FormLabel>
                        <FormDescription>
                          Receive emails about new features, offers and updates.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {notificationsForm.formState.isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Notification Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Appearance Tab */}
      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...appearanceForm}>
              <form
                onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={appearanceForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Theme</FormLabel>
                      <FormDescription>
                        Select the theme for the dashboard.
                      </FormDescription>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="light" />
                            </FormControl>
                            <FormLabel className="font-normal">Light</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="dark" />
                            </FormControl>
                            <FormLabel className="font-normal">Dark</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="system" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              System
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={appearanceForm.control}
                  name="sidebarLayout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sidebar Layout</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sidebar layout" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="expanded">Expanded</SelectItem>
                          <SelectItem value="collapsed">Collapsed</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose how the sidebar should be displayed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {appearanceForm.formState.isSubmitting && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save Appearance Settings
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your account security and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-sm text-muted-foreground">
                Update your password to maintain account security.
              </p>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormLabel>Current Password</FormLabel>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid gap-2">
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
