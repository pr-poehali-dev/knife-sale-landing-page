import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface KnifeProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  technical: {
    steel: string;
    hardness: string;
    length: string;
    weight: string;
    handle: string;
  };
  creative: string;
}

interface CartItem {
  id: string;
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const knives: KnifeProduct[] = [
    {
      id: '1',
      name: 'Кухонный нож Chef Master',
      price: 8500,
      image: '/img/6debdad2-f50f-4c97-899b-5a2681e281f2.jpg',
      description: 'Профессиональный кухонный нож для шеф-поваров',
      technical: {
        steel: 'VG-10 Damascus',
        hardness: '60-62 HRC',
        length: '200 мм',
        weight: '180 г',
        handle: 'Дерево пакка'
      },
      creative: 'Этот нож создан для тех, кто понимает истинную красоту кулинарного искусства. Каждый срез превращается в медитацию, а Damascus сталь отражает душу мастера.'
    },
    {
      id: '2',
      name: 'Damascus Elite Pro',
      price: 15000,
      image: '/img/5bbf5cb3-ccc5-4599-87d5-96b0073fbf40.jpg',
      description: 'Элитный нож из дамасской стали с узором',
      technical: {
        steel: 'Damascus 1095/15N20',
        hardness: '58-60 HRC',
        length: '210 мм',
        weight: '190 г',
        handle: 'Карбон и сталь'
      },
      creative: 'Легендарный Damascus узор рассказывает историю древних мастеров. Этот нож не просто инструмент - это произведение искусства, которое передается из поколения в поколение.'
    },
    {
      id: '3',
      name: 'Tactical Survivor',
      price: 12000,
      image: '/img/c10d6b43-2f20-41e1-96c3-9e25c6609457.jpg',
      description: 'Тактический нож для выживания и походов',
      technical: {
        steel: 'Carbon Steel 1084',
        hardness: '57-59 HRC',
        length: '250 мм',
        weight: '220 г',
        handle: 'Тактический композит'
      },
      creative: 'Когда природа испытывает на прочность, этот нож становится вашим верным спутником. Он готов к любым вызовам и создан для тех, кто не знает слова "невозможно".'
    }
  ];

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: "Товар успешно добавлен в корзину",
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const knife = knives.find(k => k.id === item.id);
      return total + (knife?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Icon name="Swords" size={32} className="text-slate-700" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">BLADE COLLECTION</h1>
                <p className="text-sm text-slate-600">Профессиональные ножи</p>
              </div>
            </div>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getCartItemsCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {getCartItemsCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    Ваши выбранные товары
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-slate-500 py-8">Корзина пуста</p>
                  ) : (
                    cart.map(item => {
                      const knife = knives.find(k => k.id === item.id);
                      if (!knife) return null;
                      return (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img src={knife.image} alt={knife.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium">{knife.name}</h4>
                            <p className="text-sm text-slate-600">{knife.price.toLocaleString()} ₽</p>
                            <p className="text-sm">Количество: {item.quantity}</p>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      );
                    })
                  )}
                  {cart.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Итого:</span>
                          <span>{getTotalPrice().toLocaleString()} ₽</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">Имя</Label>
                            <Input id="name" placeholder="Ваше имя" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" placeholder="+7 (999) 999-99-99" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                          </div>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Коллекция профессиональных ножей</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Каждый нож создан мастерами с многолетним опытом. Качество, проверенное временем.
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            Посмотреть каталог
          </Button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Наши ножи</h3>
            <p className="text-slate-600">Выберите идеальный инструмент для ваших задач</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {knives.map((knife) => (
              <Card key={knife.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={knife.image} 
                    alt={knife.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{knife.name}</CardTitle>
                  <CardDescription>{knife.description}</CardDescription>
                  <div className="text-2xl font-bold text-slate-900">
                    {knife.price.toLocaleString()} ₽
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Technical Specs */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900">Технические характеристики</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Сталь:</span>
                        <span className="font-medium">{knife.technical.steel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Твердость:</span>
                        <span className="font-medium">{knife.technical.hardness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Длина:</span>
                        <span className="font-medium">{knife.technical.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Вес:</span>
                        <span className="font-medium">{knife.technical.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Рукоять:</span>
                        <span className="font-medium">{knife.technical.handle}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Creative Description */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900">О ноже</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {knife.creative}
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(knife.id)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">BLADE COLLECTION</h4>
              <p className="text-slate-400">Профессиональные ножи для истинных ценителей качества</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <div className="space-y-2 text-slate-400">
                <p>+7 (999) 123-45-67</p>
                <p>info@bladecollection.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Гарантия</h4>
              <p className="text-slate-400">Пожизненная гарантия на все изделия</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 BLADE COLLECTION. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;