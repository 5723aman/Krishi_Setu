<?php

namespace Database\Seeders;

use App\Models\Advisory;
use App\Models\Crop;
use App\Models\MarketPrice;
use App\Models\Scheme;
use Illuminate\Database\Seeder;

class EfarmSeeder extends Seeder
{
    public function run(): void
    {
        $crops = [
            [
                'name' => 'Wheat',
                'category' => 'cereals',
                'season' => 'Rabi',
                'region_hint' => 'Indo-Gangetic plains',
                'description' => 'Staple rabi cereal; focus on timely sowing, zinc-enriched fertiliser, and rust monitoring.',
                'image_url' => 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
            ],
            [
                'name' => 'Paddy (Rice)',
                'category' => 'cereals',
                'season' => 'Kharif',
                'region_hint' => 'Eastern & southern India',
                'description' => 'Water-smart nursery, line transplanting, and AWD irrigation cut water use without hurting yield.',
                'image_url' => 'https://images.unsplash.com/photo-1536617621572-4d56a2ce8b89?w=800&q=80',
            ],
            [
                'name' => 'Chickpea (Gram)',
                'category' => 'pulses',
                'season' => 'Rabi',
                'region_hint' => 'Central & western India',
                'description' => 'Rhizobium inoculation and boron checks improve pod set on light soils.',
                'image_url' => 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80',
            ],
            [
                'name' => 'Tomato',
                'category' => 'horticulture',
                'season' => 'Year-round (region)',
                'region_hint' => 'Polyhouse clusters',
                'description' => 'Integrated pest management for whitefly and leaf miner reduces spray cycles.',
                'image_url' => 'https://images.unsplash.com/photo-1592841200221-4647b2b10fcf?w=800&q=80',
            ],
            [
                'name' => 'Potato',
                'category' => 'horticulture',
                'season' => 'Rabi',
                'region_hint' => 'Indo-Gangetic belt',
                'description' => 'Seed treatment, hilling, and blight scouting protect tuber quality.',
                'image_url' => 'https://images.unsplash.com/photo-1518977822532-69227d0bd0d7?w=800&q=80',
            ],
            [
                'name' => 'Mustard',
                'category' => 'oilseeds',
                'season' => 'Rabi',
                'region_hint' => 'North-west India',
                'description' => 'Sulphur application and aphid thresholds keep oil content stable.',
                'image_url' => 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
            ],
        ];

        foreach ($crops as $row) {
            Crop::updateOrCreate(['name' => $row['name']], $row);
        }

        $wheat = Crop::where('name', 'Wheat')->first();
        $paddy = Crop::where('name', 'Paddy (Rice)')->first();
        $gram = Crop::where('name', 'Chickpea (Gram)')->first();
        $tomato = Crop::where('name', 'Tomato')->first();

        $quotes = [
            [$wheat->id, 'Azadpur Mandi', 'Delhi', 2850],
            [$wheat->id, 'Khanna Mandi', 'Punjab', 2780],
            [$paddy->id, 'Karnal Grain Market', 'Haryana', 2420],
            [$paddy->id, 'Burdwan APMC', 'West Bengal', 2380],
            [$gram->id, 'Indore Mandi', 'Madhya Pradesh', 5200],
            [$tomato->id, 'Kolar APMC', 'Karnataka', 1850],
        ];

        foreach ($quotes as [$cropId, $mandi, $state, $price]) {
            MarketPrice::updateOrCreate(
                [
                    'crop_id' => $cropId,
                    'mandi_name' => $mandi,
                    'price_date' => now()->toDateString(),
                ],
                [
                    'state' => $state,
                    'price_per_quintal' => $price,
                ]
            );
        }

        $advisories = [
            [
                'title' => 'Soil health cards: reading your report',
                'category' => 'soil',
                'summary' => 'Learn how NPK status, pH, and micronutrients map to fertiliser doses.',
                'body' => 'Carry your SHC to the nearest soil-testing lab follow-up every third season.',
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Heat stress in flowering wheat',
                'category' => 'weather',
                'summary' => 'Short warm spells at anthesis can cut grain set—light irrigation helps canopy cooling.',
                'body' => null,
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'Fall armyworm scouting in maize',
                'category' => 'pest',
                'summary' => 'Check whorl leaves weekly; early BT+NPV combo reduces spread.',
                'body' => null,
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'Micro-irrigation maintenance before summer',
                'category' => 'irrigation',
                'summary' => 'Flush drippers, replace clogged emitters, and calibrate fertigation tanks.',
                'body' => null,
                'published_at' => now()->subDays(20),
            ],
        ];

        foreach ($advisories as $a) {
            Advisory::updateOrCreate(
                ['title' => $a['title']],
                $a
            );
        }

        $schemes = [
            [
                'title' => 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
                'department' => 'Ministry of Agriculture & Farmers Welfare',
                'summary' => 'Income support of ₹6,000 per year in three equal instalments to eligible landholding farmer families.',
                'eligibility' => 'Small and marginal farmers with cultivable land; exclusions apply for institutional landholders.',
                'benefits' => 'Direct benefit transfer to verified bank accounts.',
                'more_info_url' => 'https://pmkisan.gov.in/',
            ],
            [
                'title' => 'National Mission on Agricultural Extension & Technology',
                'department' => 'DA&FW',
                'summary' => 'ATMA-style demonstrations, farmer field schools, and use of ICT for last-mile advisories.',
                'eligibility' => 'Implemented through state ATMA cells; farmers participate via FIGs and FPOs.',
                'benefits' => 'Training, exposure visits, and input support packages as per state work plans.',
                'more_info_url' => null,
            ],
            [
                'title' => 'Formation & Promotion of 10,000 FPOs',
                'department' => 'DA&FW',
                'summary' => 'Handholding for farmer producer organisations—credit, market linkages, and equity grants.',
                'eligibility' => 'Groups of primary producers; equity grant ceilings apply.',
                'benefits' => 'Matching equity, credit guarantee cover, and business development services.',
                'more_info_url' => null,
            ],
            [
                'title' => 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)',
                'department' => 'Ministry of Jal Shakti / DA&FW',
                'summary' => 'Per-drop-more-crop: micro-irrigation, watershed works, and command area development.',
                'eligibility' => 'Varies by component; micro-irrigation subsidies routed through state nodal agencies.',
                'benefits' => 'Capital subsidy on drip/sprinkler systems for eligible farmers.',
                'more_info_url' => null,
            ],
        ];

        foreach ($schemes as $s) {
            Scheme::updateOrCreate(
                ['title' => $s['title']],
                $s
            );
        }
    }
}
