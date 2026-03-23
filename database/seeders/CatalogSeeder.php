<?php

namespace Database\Seeders;

use App\Domains\Category\Models\Category;
use App\Domains\Product\Models\Product;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    /**
     * Popula a vitrine com categorias e produtos de demonstração.
     *
     * @return void
     */
    public function run(): void
    {
        Product::query()->delete();
        Category::query()->delete();

        $catalog = [
            'Smartphones & tablets' => [
                [
                    'name' => 'Smartphone Aurora X1',
                    'description' => 'Tela AMOLED 6,7", 256 GB, 8 GB RAM, câmera tripla 50 MP e bateria de longa duração com carregamento rápido.',
                    'price' => 2499.90,
                    'image_url' => 'https://picsum.photos/seed/aurora-x1/800/800',
                ],
                [
                    'name' => 'Smartphone Compact S',
                    'description' => 'Ideal para o dia a dia: 128 GB, leitor biométrico na tela e resistência à água IP68.',
                    'price' => 1599.00,
                    'image_url' => 'https://picsum.photos/seed/compact-s/800/800',
                ],
                [
                    'name' => 'Tablet Pro 11"',
                    'description' => 'Display Liquid Retina, suporte à caneta digital e som quádruplo — produtividade e entretenimento.',
                    'price' => 3299.00,
                    'image_url' => 'https://picsum.photos/seed/tablet-pro11/800/800',
                ],
            ],
            'Notebooks & acessórios' => [
                [
                    'name' => 'Notebook Ultra 14"',
                    'description' => 'Processador de última geração, 16 GB RAM, SSD 512 GB e teclado retroiluminado. Leve para levar em qualquer lugar.',
                    'price' => 4599.90,
                    'image_url' => 'https://picsum.photos/seed/nb-ultra14/800/800',
                ],
                [
                    'name' => 'Notebook Estudante 15,6"',
                    'description' => 'Equilíbrio entre preço e desempenho: 8 GB RAM, SSD 256 GB, ideal para estudos e trabalho remoto.',
                    'price' => 2899.00,
                    'image_url' => 'https://picsum.photos/seed/nb-estudante/800/800',
                ],
                [
                    'name' => 'Mouse sem fio ergonômico',
                    'description' => 'Conexão Bluetooth, bateria recarregável e formato anatômico para longas jornadas.',
                    'price' => 189.90,
                    'image_url' => 'https://picsum.photos/seed/mouse-ergo/800/800',
                ],
                [
                    'name' => 'Hub USB-C 7 em 1',
                    'description' => 'HDMI 4K, leitor SD, USB 3.0 e pass-through de energia — expanda as portas do seu notebook.',
                    'price' => 249.00,
                    'image_url' => 'https://picsum.photos/seed/hub-usbc/800/800',
                ],
            ],
            'Áudio' => [
                [
                    'name' => 'Fones Bluetooth Noise Pro',
                    'description' => 'Cancelamento de ruído ativo, 30 h de bateria e som Hi-Res com codecs premium.',
                    'price' => 899.00,
                    'image_url' => 'https://picsum.photos/seed/fones-noise/800/800',
                ],
                [
                    'name' => 'Caixa de som portátil 360°',
                    'description' => 'Proteção contra água IPX7, pareamento estéreo e até 12 h de reprodução.',
                    'price' => 449.90,
                    'image_url' => 'https://picsum.photos/seed/caixa-360/800/800',
                ],
                [
                    'name' => 'Microfone USB para streaming',
                    'description' => 'Captação cardioide, monitoramento em tempo real e suporte incluso — pronto para podcasts e lives.',
                    'price' => 379.00,
                    'image_url' => 'https://picsum.photos/seed/mic-usb/800/800',
                ],
            ],
            'Casa inteligente' => [
                [
                    'name' => 'Assistente de voz compacto',
                    'description' => 'Controle luzes, playlists e rotinas com comandos de voz e integração com ecossistema smart home.',
                    'price' => 399.00,
                    'image_url' => 'https://picsum.photos/seed/assistente-voz/800/800',
                ],
                [
                    'name' => 'Lâmpada LED Wi-Fi RGB',
                    'description' => 'Milhões de cores, intensidade ajustável e compatível com app e assistentes de voz.',
                    'price' => 129.90,
                    'image_url' => 'https://picsum.photos/seed/lampada-rgb/800/800',
                ],
                [
                    'name' => 'Câmera de segurança Full HD',
                    'description' => 'Visão noturna, detecção de movimento e armazenamento na nuvem opcional.',
                    'price' => 299.00,
                    'image_url' => 'https://picsum.photos/seed/camera-hd/800/800',
                ],
            ],
            'Moda & lifestyle' => [
                [
                    'name' => 'Mochila urban roll-top',
                    'description' => 'Tecido repelente à água, compartimento para notebook até 15" e alças acolchoadas.',
                    'price' => 259.00,
                    'image_url' => 'https://picsum.photos/seed/mochila-roll/800/800',
                ],
                [
                    'name' => 'Relógio smart fitness',
                    'description' => 'Monitor de batimentos, GPS integrado e mais de 100 modos de treino com bateria de vários dias.',
                    'price' => 799.90,
                    'image_url' => 'https://picsum.photos/seed/smartwatch-fit/800/800',
                ],
                [
                    'name' => 'Garrafa térmica inox 750 ml',
                    'description' => 'Mantém a temperatura por horas, acabamento fosco e tampa com trava.',
                    'price' => 89.90,
                    'image_url' => 'https://picsum.photos/seed/garrafa-termica/800/800',
                ],
            ],
        ];

        foreach ($catalog as $categoryName => $products) {
            $category = Category::query()->firstOrCreate(
                ['name' => $categoryName],
                ['name' => $categoryName]
            );

            foreach ($products as $row) {
                Product::query()->create([
                    'name' => $row['name'],
                    'description' => $row['description'],
                    'price' => $row['price'],
                    'category_id' => $category->id,
                    'image_url' => $row['image_url'],
                ]);
            }
        }
    }
}
