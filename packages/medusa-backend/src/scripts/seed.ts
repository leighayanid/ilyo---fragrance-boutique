import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createStockLocationsWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/core-flows"

export default async function seed({ container }: { container: any }) {
  const logger = container.resolve("logger")

  logger.info("Seeding fragrance store data...")

  // Create sales channel
  const { result: salesChannelResult } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Ilyo Fragrance Store",
          description: "Main storefront for Ilyo Fragrance Boutique",
        },
      ],
    },
  })
  const salesChannel = salesChannelResult[0]
  logger.info(`Created sales channel: ${salesChannel.name}`)

  // Update default store with sales channel
  const storeModule = container.resolve("store")
  const [store] = await storeModule.listStores()

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        name: "Ilyo Fragrance Boutique",
        supported_currencies: [
          { currency_code: "usd", is_default: true },
          { currency_code: "eur" },
          { currency_code: "gbp" },
        ],
        default_sales_channel_id: salesChannel.id,
      },
    },
  })
  logger.info("Updated store settings")

  // Create stock location
  const { result: stockLocationResult } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [
        {
          name: "Ilyo Warehouse",
          address: {
            address_1: "123 Fragrance Lane",
            city: "New York",
            country_code: "us",
            postal_code: "10001",
          },
        },
      ],
    },
  })
  const stockLocation = stockLocationResult[0]
  logger.info(`Created stock location: ${stockLocation.name}`)

  // Link sales channel to stock location
  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [salesChannel.id],
    },
  })

  // Create regions
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "United States",
          currency_code: "usd",
          countries: ["us"],
          payment_providers: ["pp_system_default"],
        },
        {
          name: "Europe",
          currency_code: "eur",
          countries: ["gb", "de", "fr"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  })
  logger.info(`Created ${regionResult.length} regions`)

  // Create product categories for fragrance families
  const { result: categoryResult } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        { name: "Floral", handle: "floral", is_active: true },
        { name: "Woody", handle: "woody", is_active: true },
        { name: "Oriental", handle: "oriental", is_active: true },
        { name: "Fresh", handle: "fresh", is_active: true },
        { name: "Citrus", handle: "citrus", is_active: true },
        { name: "Aromatic", handle: "aromatic", is_active: true },
      ],
    },
  })
  logger.info(`Created ${categoryResult.length} product categories`)

  // Create sample fragrance products
  const products = [
    {
      title: "Midnight Rose",
      handle: "midnight-rose",
      description:
        "An enchanting floral fragrance that captures the essence of roses blooming under the moonlight. Deep, romantic, and utterly captivating with hints of oud and vanilla.",
      status: "published" as const,
      categories: [{ id: categoryResult.find((c: any) => c.handle === "floral")?.id }].filter(
        (c) => c.id
      ),
      sales_channels: [{ id: salesChannel.id }],
      metadata: {
        fragrance_family: "Floral",
        concentration: "EDP",
        gender: "Women",
        top_notes: ["Rose", "Pink Pepper", "Bergamot"],
        middle_notes: ["Turkish Rose", "Peony", "Raspberry"],
        base_notes: ["Oud", "Vanilla", "Musk"],
        longevity: 8,
        sillage: 7,
        seasons: ["Fall", "Winter"],
        occasions: ["Date", "Formal"],
        year_released: 2023,
        perfumer: "Marie Laurent",
        brand: "Ilyo",
      },
      options: [{ title: "Size", values: ["30ml", "50ml", "100ml"] }],
      variants: [
        {
          title: "30ml",
          sku: "MR-30",
          manage_inventory: true,
          prices: [
            { amount: 8500, currency_code: "usd" },
            { amount: 7500, currency_code: "eur" },
            { amount: 6500, currency_code: "gbp" },
          ],
          options: { Size: "30ml" },
        },
        {
          title: "50ml",
          sku: "MR-50",
          manage_inventory: true,
          prices: [
            { amount: 12500, currency_code: "usd" },
            { amount: 11000, currency_code: "eur" },
            { amount: 9500, currency_code: "gbp" },
          ],
          options: { Size: "50ml" },
        },
        {
          title: "100ml",
          sku: "MR-100",
          manage_inventory: true,
          prices: [
            { amount: 18500, currency_code: "usd" },
            { amount: 16500, currency_code: "eur" },
            { amount: 14000, currency_code: "gbp" },
          ],
          options: { Size: "100ml" },
        },
      ],
    },
    {
      title: "Cedar & Sage",
      handle: "cedar-sage",
      description:
        "A sophisticated woody fragrance that evokes the tranquility of an ancient forest. Crisp sage meets rich cedar and warm sandalwood for a grounding, masculine scent.",
      status: "published" as const,
      categories: [{ id: categoryResult.find((c: any) => c.handle === "woody")?.id }].filter(
        (c) => c.id
      ),
      sales_channels: [{ id: salesChannel.id }],
      metadata: {
        fragrance_family: "Woody",
        concentration: "EDT",
        gender: "Men",
        top_notes: ["Sage", "Bergamot", "Cardamom"],
        middle_notes: ["Cedarwood", "Violet Leaf", "Geranium"],
        base_notes: ["Sandalwood", "Vetiver", "Amber"],
        longevity: 7,
        sillage: 6,
        seasons: ["Fall", "Winter", "Spring"],
        occasions: ["Office", "Casual", "Date"],
        year_released: 2022,
        perfumer: "James Mitchell",
        brand: "Ilyo",
      },
      options: [{ title: "Size", values: ["50ml", "100ml"] }],
      variants: [
        {
          title: "50ml",
          sku: "CS-50",
          manage_inventory: true,
          prices: [
            { amount: 9500, currency_code: "usd" },
            { amount: 8500, currency_code: "eur" },
            { amount: 7200, currency_code: "gbp" },
          ],
          options: { Size: "50ml" },
        },
        {
          title: "100ml",
          sku: "CS-100",
          manage_inventory: true,
          prices: [
            { amount: 14500, currency_code: "usd" },
            { amount: 13000, currency_code: "eur" },
            { amount: 11000, currency_code: "gbp" },
          ],
          options: { Size: "100ml" },
        },
      ],
    },
    {
      title: "Amber Nights",
      handle: "amber-nights",
      description:
        "A luxurious oriental fragrance that tells the story of exotic bazaars and starlit desert nights. Rich amber, warm spices, and precious resins create an unforgettable trail.",
      status: "published" as const,
      categories: [{ id: categoryResult.find((c: any) => c.handle === "oriental")?.id }].filter(
        (c) => c.id
      ),
      sales_channels: [{ id: salesChannel.id }],
      metadata: {
        fragrance_family: "Oriental",
        concentration: "Parfum",
        gender: "Unisex",
        top_notes: ["Saffron", "Cinnamon", "Orange Blossom"],
        middle_notes: ["Rose Absolute", "Jasmine", "Incense"],
        base_notes: ["Amber", "Benzoin", "Vanilla", "Oud"],
        longevity: 10,
        sillage: 9,
        seasons: ["Fall", "Winter"],
        occasions: ["Date", "Formal", "Night"],
        year_released: 2024,
        perfumer: "Sophie Chen",
        brand: "Ilyo",
      },
      options: [{ title: "Size", values: ["30ml", "50ml", "100ml"] }],
      variants: [
        {
          title: "30ml",
          sku: "AN-30",
          manage_inventory: true,
          prices: [
            { amount: 15000, currency_code: "usd" },
            { amount: 13500, currency_code: "eur" },
            { amount: 11500, currency_code: "gbp" },
          ],
          options: { Size: "30ml" },
        },
        {
          title: "50ml",
          sku: "AN-50",
          manage_inventory: true,
          prices: [
            { amount: 22500, currency_code: "usd" },
            { amount: 20000, currency_code: "eur" },
            { amount: 17000, currency_code: "gbp" },
          ],
          options: { Size: "50ml" },
        },
        {
          title: "100ml",
          sku: "AN-100",
          manage_inventory: true,
          prices: [
            { amount: 35000, currency_code: "usd" },
            { amount: 31500, currency_code: "eur" },
            { amount: 27000, currency_code: "gbp" },
          ],
          options: { Size: "100ml" },
        },
      ],
    },
    {
      title: "Ocean Breeze",
      handle: "ocean-breeze",
      description:
        "A refreshing aquatic fragrance that captures the invigorating spirit of coastal mornings. Crisp sea salt, marine notes, and light florals create a clean, energizing scent.",
      status: "published" as const,
      categories: [{ id: categoryResult.find((c: any) => c.handle === "fresh")?.id }].filter(
        (c) => c.id
      ),
      sales_channels: [{ id: salesChannel.id }],
      metadata: {
        fragrance_family: "Fresh",
        concentration: "EDT",
        gender: "Unisex",
        top_notes: ["Sea Salt", "Bergamot", "Lemon"],
        middle_notes: ["Marine Accord", "Lily of the Valley", "Green Tea"],
        base_notes: ["White Musk", "Driftwood", "Ambergris"],
        longevity: 6,
        sillage: 5,
        seasons: ["Spring", "Summer"],
        occasions: ["Casual", "Office", "Sport"],
        year_released: 2023,
        perfumer: "Marco Rossi",
        brand: "Ilyo",
      },
      options: [{ title: "Size", values: ["50ml", "100ml", "150ml"] }],
      variants: [
        {
          title: "50ml",
          sku: "OB-50",
          manage_inventory: true,
          prices: [
            { amount: 7500, currency_code: "usd" },
            { amount: 6700, currency_code: "eur" },
            { amount: 5700, currency_code: "gbp" },
          ],
          options: { Size: "50ml" },
        },
        {
          title: "100ml",
          sku: "OB-100",
          manage_inventory: true,
          prices: [
            { amount: 11000, currency_code: "usd" },
            { amount: 9900, currency_code: "eur" },
            { amount: 8400, currency_code: "gbp" },
          ],
          options: { Size: "100ml" },
        },
        {
          title: "150ml",
          sku: "OB-150",
          manage_inventory: true,
          prices: [
            { amount: 14500, currency_code: "usd" },
            { amount: 13000, currency_code: "eur" },
            { amount: 11000, currency_code: "gbp" },
          ],
          options: { Size: "150ml" },
        },
      ],
    },
    {
      title: "Sicilian Sun",
      handle: "sicilian-sun",
      description:
        "A vibrant citrus fragrance inspired by sun-drenched Italian orchards. Zesty lemon and bergamot dance with neroli and jasmine over a base of white cedar.",
      status: "published" as const,
      categories: [{ id: categoryResult.find((c: any) => c.handle === "citrus")?.id }].filter(
        (c) => c.id
      ),
      sales_channels: [{ id: salesChannel.id }],
      metadata: {
        fragrance_family: "Citrus",
        concentration: "EDC",
        gender: "Unisex",
        top_notes: ["Sicilian Lemon", "Bergamot", "Grapefruit"],
        middle_notes: ["Neroli", "Jasmine", "Petitgrain"],
        base_notes: ["White Cedar", "Musk", "Amber"],
        longevity: 5,
        sillage: 4,
        seasons: ["Spring", "Summer"],
        occasions: ["Day", "Casual", "Office"],
        year_released: 2022,
        perfumer: "Antonio Ferrara",
        brand: "Ilyo",
      },
      options: [{ title: "Size", values: ["75ml", "150ml"] }],
      variants: [
        {
          title: "75ml",
          sku: "SS-75",
          manage_inventory: true,
          prices: [
            { amount: 6500, currency_code: "usd" },
            { amount: 5800, currency_code: "eur" },
            { amount: 5000, currency_code: "gbp" },
          ],
          options: { Size: "75ml" },
        },
        {
          title: "150ml",
          sku: "SS-150",
          manage_inventory: true,
          prices: [
            { amount: 9500, currency_code: "usd" },
            { amount: 8500, currency_code: "eur" },
            { amount: 7200, currency_code: "gbp" },
          ],
          options: { Size: "150ml" },
        },
      ],
    },
    {
      title: "Lavender Fields",
      handle: "lavender-fields",
      description:
        "A calming aromatic fragrance that transports you to endless purple fields of Provence. Soothing lavender blends with herbs and warm woods for a timeless, elegant scent.",
      status: "published" as const,
      categories: [{ id: categoryResult.find((c: any) => c.handle === "aromatic")?.id }].filter(
        (c) => c.id
      ),
      sales_channels: [{ id: salesChannel.id }],
      metadata: {
        fragrance_family: "Aromatic",
        concentration: "EDP",
        gender: "Unisex",
        top_notes: ["French Lavender", "Rosemary", "Bergamot"],
        middle_notes: ["Clary Sage", "Geranium", "Iris"],
        base_notes: ["Tonka Bean", "Sandalwood", "Coumarin"],
        longevity: 8,
        sillage: 6,
        seasons: ["All Season"],
        occasions: ["Casual", "Office", "Day"],
        year_released: 2023,
        perfumer: "Claire Dubois",
        brand: "Ilyo",
      },
      options: [{ title: "Size", values: ["50ml", "100ml"] }],
      variants: [
        {
          title: "50ml",
          sku: "LF-50",
          manage_inventory: true,
          prices: [
            { amount: 8900, currency_code: "usd" },
            { amount: 7900, currency_code: "eur" },
            { amount: 6800, currency_code: "gbp" },
          ],
          options: { Size: "50ml" },
        },
        {
          title: "100ml",
          sku: "LF-100",
          manage_inventory: true,
          prices: [
            { amount: 13500, currency_code: "usd" },
            { amount: 12000, currency_code: "eur" },
            { amount: 10200, currency_code: "gbp" },
          ],
          options: { Size: "100ml" },
        },
      ],
    },
  ]

  const { result: productResult } = await createProductsWorkflow(container).run({
    input: {
      products,
    },
  })
  logger.info(`Created ${productResult.length} fragrance products`)

  // Create admin user
  const authModule = container.resolve("auth")
  const userModule = container.resolve("user")

  const authIdentity = await authModule.createAuthIdentities({
    provider_identities: [
      {
        provider: "emailpass",
        entity_id: "admin@ilyo.com",
        provider_metadata: {
          password: "supersecret",
        },
      },
    ],
  })

  await userModule.createUsers({
    email: "admin@ilyo.com",
    first_name: "Admin",
    last_name: "User",
  })

  // Link auth identity to user
  const [user] = await userModule.listUsers({ email: "admin@ilyo.com" })
  await authModule.updateAuthIdentities({
    id: authIdentity.id,
    app_metadata: {
      user_id: user.id,
    },
  })

  logger.info("Created admin user: admin@ilyo.com / supersecret")

  logger.info("Seeding complete!")
}
