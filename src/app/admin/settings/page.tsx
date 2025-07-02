"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettings() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cài đặt hệ thống</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt chung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Tên trang web</Label>
              <Input id="siteName" placeholder="Nhập tên trang web" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Mô tả trang web</Label>
              <Input id="siteDescription" placeholder="Nhập mô tả trang web" />
            </div>
            <Button>Lưu thay đổi</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input id="metaTitle" placeholder="Nhập meta title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Input id="metaDescription" placeholder="Nhập meta description" />
            </div>
            <Button>Cập nhật SEO</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
