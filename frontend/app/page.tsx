// app/page.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍯 SweetLearn Platform
          </h1>
          <p className="text-xl text-gray-600">
            منصة التعلم الذكية - نظام إدارة التعلم
          </p>
          <Badge variant="secondary" className="mt-4">
            Beta Version
          </Badge>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Welcome Card */}
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>👨‍💻</AvatarFallback>
                </Avatar>
                مرحباً في SweetLearn
              </CardTitle>
              <CardDescription>
                منصة متكاملة لإدارة التعلم والكورسات التفاعلية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>ابدأ التعلم</Button>
                <Button variant="outline">استكشف الكورسات</Button>
                <Button variant="secondary">الملف الشخصي</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>📚 الكورسات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">24</div>
              <p className="text-sm text-gray-600">كورس متاح</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👥 الطلاب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">1,247</div>
              <p className="text-sm text-gray-600">طالب مسجل</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⭐ التقييم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">4.8</div>
              <p className="text-sm text-gray-600">من 5 نجوم</p>
            </CardContent>
          </Card>

          {/* Login Form Preview */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>تسجيل الدخول السريع</CardTitle>
              <CardDescription>
                اختبار نموذج تسجيل الدخول
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">البريد الإلكتروني</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium">كلمة المرور</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full">تسجيل الدخول</Button>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 الميزات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline">دعم العربية</Badge>
              <Badge variant="outline">واجهة حديثة</Badge>
              <Badge variant="outline">استجابة سريعة</Badge>
              <Badge variant="outline">أمان عالي</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p>تم البناء باستخدام Next.js + TypeScript + Tailwind CSS + Shadcn/ui</p>
          <p className="text-sm mt-2">Backend: Rust + Actix Web + PostgreSQL</p>
        </div>
      </div>
    </div>
  )
}