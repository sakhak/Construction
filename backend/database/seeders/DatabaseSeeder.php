<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Project;
use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'loeungsakhak438@gmail.com'],
            [
                'name' => 'SakHak',
                'password' => 'password',
            ]
        );

        $this->prepareSeedImages();

        Service::whereIn('code', [
            'inactive-draft-service',
            'renovation-remodeling',
        ])->delete();
        Project::where('code', 'inactive-draft-project')->delete();
        Blog::where('slug', 'inactive-draft-blog')->delete();

        $services = [
            [
                'name' => 'Turnkey Residential Construction',
                'code' => 'residential-construction',
                'from_country' => 'Cambodia',
                'description' => 'Home and villa construction planned around the property, site access, drainage, material deliveries, structural work, and finishing.',
                'price' => 25000,
                'image' => 'service-01.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Commercial Building and Shop House',
                'code' => 'commercial-building',
                'from_country' => 'Cambodia',
                'description' => 'Construction for offices, retail spaces, and shop houses, with attention to site logistics, material lead times, and coordination of trades.',
                'price' => 65000,
                'image' => 'service-02.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Interior Renovation and Fit-Out',
                'code' => 'interior-renovation-fit-out',
                'from_country' => 'Cambodia',
                'description' => 'Interior upgrades for homes and businesses, including partitions, ceilings, flooring, lighting, painting, joinery, and final checks.',
                'price' => 8500,
                'image' => 'service-03.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Concrete and Structural Works',
                'code' => 'concrete-structural-work',
                'from_country' => 'Cambodia',
                'description' => 'Concrete and structural work scoped to the site, including foundations, columns, slabs, beams, drainage channels, and repairs.',
                'price' => 12000,
                'image' => 'service-04.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Warehouse and Industrial Construction',
                'code' => 'warehouse-industrial-construction',
                'from_country' => 'Cambodia',
                'description' => 'Warehouse and industrial site work, including floor upgrades, loading areas, roofing, drainage, and access improvements.',
                'price' => 78000,
                'image' => 'service-05.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Roofing and Waterproofing Systems',
                'code' => 'roofing-waterproofing',
                'from_country' => 'Cambodia',
                'description' => 'Roofing and waterproofing work for roofs and wet areas, with attention to rainfall exposure, drainage, flashing, and leak prevention.',
                'price' => 6200,
                'image' => 'service-06.jpg',
                'status' => 1,
            ],
            [
                'name' => 'MEP Coordination and Installation',
                'code' => 'mep-coordination-installation',
                'from_country' => 'Cambodia',
                'description' => 'Mechanical, electrical, and plumbing coordination for homes, offices, shops, and commercial buildings.',
                'price' => 15000,
                'image' => 'service-07.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Project Management and Site Supervision',
                'code' => 'project-management-supervision',
                'from_country' => 'Cambodia',
                'description' => 'Project scheduling, trade coordination, progress updates, site checks, and planning for local delivery and access constraints.',
                'price' => 5000,
                'image' => 'service-08.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Civil Works and Site Preparation',
                'code' => 'civil-works-site-preparation',
                'from_country' => 'Cambodia',
                'description' => 'Site preparation including clearing, earthworks, drainage, access, boundary works, utility trenches, and paving.',
                'price' => 18000,
                'image' => 'service-09.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Maintenance and Post-Construction Support',
                'code' => 'maintenance-post-construction',
                'from_country' => 'Cambodia',
                'description' => 'Building maintenance and repairs, including defect checks, repainting, waterproofing review, and facility improvements.',
                'price' => 3500,
                'image' => 'service-10.jpg',
                'status' => 1,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['code' => $service['code']], $service);
        }

        $projects = [
            [
                'name' => 'Modern Borey Family Villa',
                'code' => 'borey-family-villa',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example residential project in Phnom Penh. The scope covers a family villa, structural work, building services, and interior finishing.',
                'location' => 'Phnom Penh',
                'construction_type' => 'Residential',
                'image' => 'project-01.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Riverside Mixed-Use Shop House',
                'code' => 'riverside-shop-house',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example shop house project in Kandal, planned for ground-floor retail, upper-floor living, practical access, and durable finishes.',
                'location' => 'Kandal',
                'construction_type' => 'Commercial',
                'image' => 'project-02.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Logistics Warehouse Floor Upgrade',
                'code' => 'warehouse-foundation-upgrade',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example warehouse upgrade in Sihanoukville, focused on floor improvements, drainage, and site access for logistics.',
                'location' => 'Sihanoukville',
                'construction_type' => 'Industrial',
                'image' => 'project-03.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Corporate Office Interior Fit-Out',
                'code' => 'office-interior-renovation',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example office fit-out in Siem Reap, including meeting areas, partitions, ceilings, lighting, flooring, and paintwork.',
                'location' => 'Siem Reap',
                'construction_type' => 'Renovation',
                'image' => 'project-04.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Boutique Hotel Lobby Renovation',
                'code' => 'boutique-hotel-lobby-renovation',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example hospitality renovation in Kampot, including lobby finishes, lighting, reception, and a guest waiting area.',
                'location' => 'Kampot',
                'construction_type' => 'Hospitality',
                'image' => 'project-05.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Retail Showroom Construction',
                'code' => 'retail-showroom-construction',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example Phnom Penh retail fit-out with display areas, flooring, lighting, storage, and a customer service counter.',
                'location' => 'Phnom Penh',
                'construction_type' => 'Retail',
                'image' => 'project-06.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Private Residence Renovation',
                'code' => 'private-residence-renovation',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example home renovation in Battambang, covering bathrooms, kitchen updates, waterproofing, repainting, and flooring.',
                'location' => 'Battambang',
                'construction_type' => 'Renovation',
                'image' => 'project-07.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Factory Drainage and Paving Works',
                'code' => 'factory-drainage-paving',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example civil works in Takeo, including site grading, drainage, paving, access improvements, and boundary repairs.',
                'location' => 'Takeo',
                'construction_type' => 'Civil Works',
                'image' => 'project-08.jpg',
                'status' => 1,
            ],
            [
                'name' => 'School Classroom Extension',
                'code' => 'school-classroom-extension',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example classroom extension in Kampong Cham, including structural work, roofing, windows, electrical work, and paving.',
                'location' => 'Kampong Cham',
                'construction_type' => 'Education',
                'image' => 'project-09.jpg',
                'status' => 1,
            ],
            [
                'name' => 'Restaurant Kitchen and Dining Fit-Out',
                'code' => 'restaurant-kitchen-dining-fit-out',
                'from_country' => 'Cambodia',
                'descrioption' => 'Example restaurant fit-out in Siem Reap, including kitchen planning, ventilation coordination, tiling, and dining area finishes.',
                'location' => 'Siem Reap',
                'construction_type' => 'Food and Beverage',
                'image' => 'project-10.jpg',
                'status' => 1,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(['code' => $project['code']], $project);
        }

        $blogs = [
            [
                'title' => 'Planning a Construction Budget in Cambodia',
                'slug' => 'home-construction-budget',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Plan scope, materials, labor, delivery, and contingency before starting a building project in Cambodia.',
                'content' => 'Start with a clear scope, site review, drawings, and quantity estimates. Check material availability and delivery access for the project location. Allow for site preparation and a reasonable contingency, and confirm applicable requirements with qualified local professionals before work begins.',
                'image' => 'blog-01.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Choosing a Contractor for a Cambodian Building Project',
                'slug' => 'choosing-right-contractor',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Questions to discuss about scope, site access, materials, schedule, and written quotations.',
                'content' => 'Ask prospective contractors to explain the scope, exclusions, material specifications, site access assumptions, schedule, payment milestones, and how changes will be approved. Review relevant work and get agreements in writing. Confirm permits and other local requirements with the appropriate authorities and professionals.',
                'image' => 'blog-02.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Concrete Work in Cambodia: Planning and Quality Checks',
                'slug' => 'structural-work-should-not-be-rushed',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Good preparation, reinforcement checks, concrete placement, and curing are important for structural work.',
                'content' => 'Structural concrete work needs suitable design and supervision by qualified professionals. Before placement, check formwork, reinforcement, embedded services, and the approved mix. Follow the project specifications for placement, curing, and inspection, taking site and weather conditions into account.',
                'image' => 'blog-03.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Planning a Shop or Office Renovation in Cambodia',
                'slug' => 'renovation-tips-commercial-spaces',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Coordinate layout, customer access, deliveries, services, and finishes before renovation begins.',
                'content' => 'Before renovating a shop or office, review the layout, customer and delivery access, storage, lighting, and electrical and plumbing changes. Agree on work hours and site access, and select finishes that suit the intended use and maintenance needs. Check applicable building requirements before starting.',
                'image' => 'blog-04.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Preparing a Construction Site in Cambodia',
                'slug' => 'before-site-preparation',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Review boundaries, access, drainage, utilities, and material storage before work begins.',
                'content' => 'Before site work, confirm the property boundaries and survey information with qualified professionals. Review vehicle access, drainage, neighboring properties, temporary utilities, and a safe place for materials. Seasonal rainfall can affect earthworks and access, so discuss the work sequence and protection measures with the project team.',
                'image' => 'blog-05.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Keeping a Construction Project on Track',
                'slug' => 'weekly-site-reports',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Regular updates make progress, material deliveries, decisions, and delays easier to follow.',
                'content' => 'Agree on a regular update that records completed work, upcoming tasks, material deliveries, open decisions, and schedule risks. Keep a record of approved changes and share site photos where useful. A clear communication routine helps owners and contractors address issues early.',
                'image' => 'blog-06.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Waterproofing and Rain Protection for Buildings',
                'slug' => 'waterproofing-details-long-term',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Careful detailing at roofs, balconies, wet areas, and drainage points helps prevent water ingress.',
                'content' => 'Discuss waterproofing for roofs, balconies, bathrooms, and other exposed areas as part of the design and construction scope. Surface preparation, falls to drains, junction details, compatible products, and inspection all matter. Follow the selected system instructions and test it before covering where required.',
                'image' => 'blog-07.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Coordinating Building Services Before Finishing Work',
                'slug' => 'mep-coordination-building-projects',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Plan electrical, plumbing, ventilation, and maintenance access before closing walls and ceilings.',
                'content' => 'Coordinate electrical, plumbing, and ventilation routes with the building layout before walls and ceilings are closed. Confirm access for maintenance, fixture locations, and any equipment requirements. Use qualified professionals for design, installation, and testing.',
                'image' => 'blog-08.jpg',
                'status' => 1,
            ],
            [
                'title' => 'A Practical Construction Handover Checklist',
                'slug' => 'smooth-project-handover',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Walk through the completed work, record outstanding items, and collect relevant manuals and documents.',
                'content' => 'Plan a walkthrough with the contractor and record any incomplete or defective items with an agreed follow-up date. Review relevant equipment tests, keys, product information, warranties, and maintenance instructions. Confirm the agreed handover documents and final account before closing the project.',
                'image' => 'blog-09.jpg',
                'status' => 1,
            ],
            [
                'title' => 'Ordering Construction Materials for Projects Across Cambodia',
                'slug' => 'material-procurement-tips',
                'author' => 'Loeung Sakhak Construction',
                'short_description' => 'Check local availability, delivery access, lead times, specifications, and storage before ordering.',
                'content' => 'Confirm material specifications and compare availability, lead times, delivery costs, and storage needs for the project location. Check how products will be protected on site and whether installation requires particular tools or skills. Approve substitutions before ordering so changes are documented.',
                'image' => 'blog-10.jpg',
                'status' => 1,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::updateOrCreate(['slug' => $blog['slug']], $blog);
        }
    }

    private function prepareSeedImages(): void
    {
        $imageSets = [
            'services' => [
                'service-01.jpg' => 'cambodia-phnom-penh-skyline.jpg',
                'service-02.jpg' => 'cambodia-phnom-penh-bridge-skyline.jpg',
                'service-03.jpg' => 'cambodia-wat-langka.jpg',
                'service-04.jpg' => 'cambodia-wat-phnom.jpg',
                'service-05.jpg' => 'cambodia-rural-khmer-house.jpg',
                'service-06.jpg' => 'cambodia-stilt-houses.jpg',
                'service-07.jpg' => 'cambodia-kampot-museum.jpg',
                'service-08.jpg' => 'cambodia-central-market.jpg',
                'service-09.jpg' => 'cambodia-angkor-wat-gateway.jpg',
                'service-10.jpg' => 'cambodia-angkor-thom.jpg',
            ],
            'projects' => [
                'project-01.jpg' => 'cambodia-phnom-penh-skyline.jpg',
                'project-02.jpg' => 'cambodia-phnom-penh-bridge-skyline.jpg',
                'project-03.jpg' => 'cambodia-wat-langka.jpg',
                'project-04.jpg' => 'cambodia-wat-phnom.jpg',
                'project-05.jpg' => 'cambodia-rural-khmer-house.jpg',
                'project-06.jpg' => 'cambodia-stilt-houses.jpg',
                'project-07.jpg' => 'cambodia-kampot-museum.jpg',
                'project-08.jpg' => 'cambodia-central-market.jpg',
                'project-09.jpg' => 'cambodia-angkor-wat-gateway.jpg',
                'project-10.jpg' => 'cambodia-angkor-thom.jpg',
            ],
            'blogs' => [
                'blog-01.jpg' => 'cambodia-phnom-penh-skyline.jpg',
                'blog-02.jpg' => 'cambodia-phnom-penh-bridge-skyline.jpg',
                'blog-03.jpg' => 'cambodia-wat-langka.jpg',
                'blog-04.jpg' => 'cambodia-wat-phnom.jpg',
                'blog-05.jpg' => 'cambodia-rural-khmer-house.jpg',
                'blog-06.jpg' => 'cambodia-stilt-houses.jpg',
                'blog-07.jpg' => 'cambodia-kampot-museum.jpg',
                'blog-08.jpg' => 'cambodia-central-market.jpg',
                'blog-09.jpg' => 'cambodia-angkor-wat-gateway.jpg',
                'blog-10.jpg' => 'cambodia-angkor-thom.jpg',
            ],
        ];

        $sourceRoot = base_path('../frontend/src/assets/image');

        foreach ($imageSets as $folder => $images) {
            foreach (['large', 'small'] as $size) {
                File::ensureDirectoryExists(public_path("Upload/{$folder}/{$size}"));
            }

            foreach ($images as $targetName => $sourceName) {
                $sourcePath = $sourceRoot . DIRECTORY_SEPARATOR . $sourceName;

                if (! File::exists($sourcePath)) {
                    continue;
                }

                File::copy($sourcePath, public_path("Upload/{$folder}/large/{$targetName}"));
                File::copy($sourcePath, public_path("Upload/{$folder}/small/{$targetName}"));
            }
        }
    }
}
