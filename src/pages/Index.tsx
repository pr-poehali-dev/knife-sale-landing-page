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
  category: string;
  technical: {
    steel: string;
    hardness: string;
    length: string;
    weight: string;
    handle: string;
  };
  features: string[];
}

interface CartItem {
  id: string;
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knives: KnifeProduct[] = [
    {
      id: '1',
      name: 'Chef Master Damascus',
      price: 8500,
      image: '/img/093c0f06-1bce-4894-adb0-7e77676010a8.jpg',
      description: 'Профессиональный поварской нож из дамасской стали',
      category: 'kitchen',
      technical: {
        steel: 'VG-10 Damascus',
        hardness: '60-62 HRC',
        length: '200 мм',
        weight: '180 г',
        handle: 'Дерево пакка'
      },
      features: ['Дамасский узор', 'Острая заточка', 'Эргономичная рукоять', 'Нержавеющая сталь']
    },
    {
      id: '2',
      name: 'Santoku Professional',
      price: 6500,
      image: '/img/eb44b5fd-f2be-4daf-8396-db0fd5f2bfcb.jpg',
      description: 'Японский нож сантоку для точных нарезок',
      category: 'kitchen',
      technical: {
        steel: 'AUS-8 Stainless',
        hardness: '58-60 HRC',
        length: '180 мм',
        weight: '160 г',
        handle: 'Черный композит'
      },
      features: ['Японская геометрия', 'Антиприлипающие лунки', 'Точная балансировка', 'Легкий вес']
    },
    {
      id: '3',
      name: 'Tactical Folder Pro',
      price: 4500,
      image: '/img/8b555a48-8eba-4dfe-8fb2-280a706c59ee.jpg',
      description: 'Складной тактический нож для outdoor',
      category: 'tactical',
      technical: {
        steel: 'Carbon Steel 1084',
        hardness: '57-59 HRC',
        length: '120 мм',
        weight: '150 г',
        handle: 'Тактический композит'
      },
      features: ['Складная конструкция', 'Клипса для ношения', 'Прочный замок', 'Антискользящая рукоять']
    },
    {
      id: '4',
      name: 'Hunter Fixed Blade',
      price: 7200,
      image: '/img/56f04eb3-2340-4321-991a-81736d1003c8.jpg',
      description: 'Охотничий нож с кожаными ножнами',
      category: 'hunting',
      technical: {
        steel: 'High Carbon 1095',
        hardness: '58-60 HRC',
        length: '150 мм',
        weight: '200 г',
        handle: 'Дерево и кожа'
      },
      features: ['Кожаные ножны', 'Универсальная заточка', 'Прочная конструкция', 'Классический дизайн']
    },
    {
      id: '5',
      name: 'Ceramic Ultra Sharp',
      price: 3500,
      image: '/img/e67181f6-4270-423a-8a69-2a41913f1bed.jpg',
      description: 'Керамический нож для деликатных продуктов',
      category: 'kitchen',
      technical: {
        steel: 'Цирконий керамика',
        hardness: '85+ HRC',
        length: '160 мм',
        weight: '90 г',
        handle: 'Эргономичный пластик'
      },
      features: ['Керамическое лезвие', 'Ультра-легкий', 'Не окисляется', 'Сверхострый']
    },
    {
      id: '6',
      name: 'Bread Knife Serrated',
      price: 2800,
      image: '/img/68663f4f-79a6-44b3-b786-e00237e122f9.jpg',
      description: 'Хлебный нож с зубчатым лезвием',
      category: 'kitchen',
      technical: {
        steel: 'Нержавеющая сталь',
        hardness: '55-57 HRC',
        length: '200 мм',
        weight: '140 г',
        handle: 'Дерево бук'
      },
      features: ['Зубчатое лезвие', 'Для хлеба и выпечки', 'Не крошит', 'Деревянная рукоять']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все ножи', count: knives.length },
    { id: 'kitchen', name: 'Кухонные', count: knives.filter(k => k.category === 'kitchen').length },
    { id: 'tactical', name: 'Тактические', count: knives.filter(k => k.category === 'tactical').length },
    { id: 'hunting', name: 'Охотничьи', count: knives.filter(k => k.category === 'hunting').length }
  ];

  const filteredKnives = selectedCategory === 'all' 
    ? knives 
    : knives.filter(knife => knife.category === selectedCategory);

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
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" size={48} className="mx-auto text-slate-400 mb-4" />
                      <p className="text-slate-500 text-lg">Корзина пуста</p>
                      <p className="text-slate-400 text-sm">Добавьте ножи из каталога</p>
                    </div>
                  ) : (
                    cart.map(item => {
                      const knife = knives.find(k => k.id === item.id);
                      if (!knife) return null;
                      return (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                          <img src={knife.image} alt={knife.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium">{knife.name}</h4>
                            <p className="text-sm text-slate-600">{knife.price.toLocaleString()} ₽</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === knife.category)?.name}
                              </Badge>
                              <span className="text-sm text-slate-500">× {item.quantity}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-slate-900">
                              {(knife.price * item.quantity).toLocaleString()} ₽
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1"
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {cart.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-600">Товаров:</span>
                            <span>{getCartItemsCount()} шт.</span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-600">Доставка:</span>
                            <span className="text-green-600 font-medium">Бесплатно</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between items-center font-bold text-lg">
                            <span>Итого:</span>
                            <span>{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="firstName">Имя</Label>
                              <Input id="firstName" placeholder="Иван" />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Фамилия</Label>
                              <Input id="lastName" placeholder="Иванов" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" placeholder="+7 (999) 999-99-99" />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                          </div>
                          <div>
                            <Label htmlFor="address">Адрес доставки</Label>
                            <Input id="address" placeholder="Улица, дом, квартира" />
                          </div>
                          <div>
                            <Label htmlFor="comment">Комментарий к заказу</Label>
                            <Input id="comment" placeholder="Дополнительные пожелания" />
                          </div>
                        </div>
                        
                        <Button className="w-full" size="lg">
                          <Icon name="CreditCard" size={16} className="mr-2" />
                          Оформить заказ на {getTotalPrice().toLocaleString()} ₽
                        </Button>
                        
                        <div className="text-center text-xs text-slate-500">
                          Нажимая кнопку, вы соглашаетесь с условиями обработки данных
                        </div>
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
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Линейка профессиональных ножей
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            От кухонных шедевров до тактических решений — полная коллекция ножей для любых задач.
            Каждый нож создан мастерами с многолетним опытом.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Badge variant="outline" className="text-white border-white/30 bg-white/10">
              Пожизненная гарантия
            </Badge>
            <Badge variant="outline" className="text-white border-white/30 bg-white/10">
              Ручная работа
            </Badge>
            <Badge variant="outline" className="text-white border-white/30 bg-white/10">
              Премиум сталь
            </Badge>
          </div>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
            <Icon name="Eye" size={20} className="mr-2" />
            Посмотреть каталог
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-4">Наша линейка ножей</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Полный ассортимент профессиональных ножей для кухни, охоты и тактических задач
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredKnives.map((knife) => (
              <Card key={knife.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                <div className="aspect-square overflow-hidden rounded-t-lg bg-gradient-to-br from-slate-50 to-slate-100">
                  <img 
                    src={knife.image} 
                    alt={knife.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find(c => c.id === knife.category)?.name || knife.category}
                    </Badge>
                    <div className="text-2xl font-bold text-slate-900">
                      {knife.price.toLocaleString()} ₽
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{knife.name}</CardTitle>
                  <CardDescription className="text-slate-600">{knife.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 flex items-center gap-2">
                      <Icon name="Star" size={16} />
                      Особенности
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {knife.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Icon name="Check" size={12} className="text-green-600 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Technical Specs */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900 flex items-center gap-2">
                      <Icon name="Settings" size={16} />
                      Характеристики
                    </h4>
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
                    </div>
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

      {/* Info Section */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-slate-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">Пожизненная гарантия</h4>
              <p className="text-slate-600">Каждый нож покрыт пожизненной гарантией от производственных дефектов</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-slate-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">Бесплатная доставка</h4>
              <p className="text-slate-600">Доставляем по всей России бесплатно при заказе от 3000 рублей</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={32} className="text-slate-700" />
              </div>
              <h4 className="font-bold text-lg mb-2">Ручная работа</h4>
              <p className="text-slate-600">Каждый нож изготовлен вручную мастерами с 20+ летним опытом</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Swords" size={24} className="text-white" />
                <h4 className="font-bold text-lg">BLADE COLLECTION</h4>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Профессиональные ножи для истинных ценителей качества. 
                Мы создаем инструменты, которые служат поколениями.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Каталог</h4>
              <div className="space-y-2 text-slate-400">
                <p>Кухонные ножи</p>
                <p>Тактические ножи</p>
                <p>Охотничьи ножи</p>
                <p>Аксессуары</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Контакты</h4>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@bladecollection.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, Россия
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-4">
                <div className="bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Icon name="Instagram" size={20} />
                </div>
                <div className="bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Icon name="Facebook" size={20} />
                </div>
                <div className="bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Icon name="Youtube" size={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 BLADE COLLECTION. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;