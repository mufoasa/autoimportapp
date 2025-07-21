"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Car, Euro } from "lucide-react"

interface CountryData {
  customsDuty: number
  vatRate: number
  exciseBase: number
  co2Threshold: number
  notes: string
}

const countryData: Record<string, CountryData> = {
  // Non-EU Countries
  albania: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 2.0,
    co2Threshold: 120,
    notes: "Excise tax on engines >2.5L or age >5 years",
  },
  "bosnia-herzegovina": {
    customsDuty: 10,
    vatRate: 17,
    exciseBase: 1.8,
    co2Threshold: 115,
    notes: "Excise on fuel and CO₂",
  },
  kosovo: {
    customsDuty: 5,
    vatRate: 18,
    exciseBase: 1.5,
    co2Threshold: 110,
    notes: "Excise depends on engine size and age",
  },
  montenegro: {
    customsDuty: 7.5, // Average of 5-10%
    vatRate: 21,
    exciseBase: 2.2,
    co2Threshold: 120,
    notes: "Excise tax on vehicles depending on size/age",
  },
  "north-macedonia": {
    customsDuty: 5,
    vatRate: 18,
    exciseBase: 1.5,
    co2Threshold: 120,
    notes: "Excise/eco tax based on emissions",
  },
  serbia: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 2.0,
    co2Threshold: 115,
    notes: "Excise and environmental taxes",
  },
  ukraine: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 1.8,
    co2Threshold: 120,
    notes: "Excise duties and environmental tax",
  },

  // EU Countries
  austria: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 2.5,
    co2Threshold: 95,
    notes: "Excise varies; CO₂-based tax on fuel consumption",
  },
  belgium: {
    customsDuty: 10,
    vatRate: 21,
    exciseBase: 2.8,
    co2Threshold: 95,
    notes: "Excise taxes depend on fuel and age",
  },
  bulgaria: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 2.0,
    co2Threshold: 95,
    notes: "Excise on fuel and CO₂ emissions",
  },
  croatia: {
    customsDuty: 10,
    vatRate: 25,
    exciseBase: 3.0,
    co2Threshold: 95,
    notes: "Excise varies by engine capacity & emissions",
  },
  cyprus: {
    customsDuty: 10,
    vatRate: 19,
    exciseBase: 2.5,
    co2Threshold: 95,
    notes: "Excise taxes + green tax on emissions",
  },
  czechia: {
    customsDuty: 10,
    vatRate: 21,
    exciseBase: 2.3,
    co2Threshold: 95,
    notes: "Excise tax on fuel and emissions",
  },
  denmark: {
    customsDuty: 10,
    vatRate: 25,
    exciseBase: 4.5,
    co2Threshold: 95,
    notes: "High registration tax, excise based on engine size and emissions",
  },
  estonia: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 1.8,
    co2Threshold: 95,
    notes: "Excise applies mostly on fuel",
  },
  finland: {
    customsDuty: 10,
    vatRate: 24,
    exciseBase: 3.2,
    co2Threshold: 95,
    notes: "Excise varies by CO₂ emissions",
  },
  france: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 4.0,
    co2Threshold: 117,
    notes: "Bonus-malus system (eco tax) based on CO₂",
  },
  germany: {
    customsDuty: 10,
    vatRate: 19,
    exciseBase: 2.0,
    co2Threshold: 95,
    notes: "CO₂-based motor vehicle tax, excise varies",
  },
  greece: {
    customsDuty: 10,
    vatRate: 24,
    exciseBase: 2.8,
    co2Threshold: 95,
    notes: "Registration and excise taxes depend on engine size & emissions",
  },
  hungary: {
    customsDuty: 10,
    vatRate: 27,
    exciseBase: 2.5,
    co2Threshold: 95,
    notes: "Excise based on fuel and CO₂",
  },
  ireland: {
    customsDuty: 10,
    vatRate: 23,
    exciseBase: 3.5,
    co2Threshold: 95,
    notes: "Vehicle registration tax includes CO₂ emissions fees",
  },
  italy: {
    customsDuty: 10,
    vatRate: 22,
    exciseBase: 2.8,
    co2Threshold: 95,
    notes: "Registration tax & eco tax on emissions",
  },
  latvia: {
    customsDuty: 10,
    vatRate: 21,
    exciseBase: 2.2,
    co2Threshold: 95,
    notes: "Excise tax based on engine and emissions",
  },
  lithuania: {
    customsDuty: 10,
    vatRate: 21,
    exciseBase: 2.3,
    co2Threshold: 95,
    notes: "Excise on CO₂ emissions",
  },
  luxembourg: {
    customsDuty: 10,
    vatRate: 16,
    exciseBase: 2.0,
    co2Threshold: 95,
    notes: "Excise based on fuel and engine size",
  },
  malta: {
    customsDuty: 10,
    vatRate: 18,
    exciseBase: 2.2,
    co2Threshold: 95,
    notes: "Excise duties and environmental tax",
  },
  netherlands: {
    customsDuty: 10,
    vatRate: 21,
    exciseBase: 3.8,
    co2Threshold: 95,
    notes: "Registration tax based on CO₂ and price",
  },
  poland: {
    customsDuty: 10,
    vatRate: 23,
    exciseBase: 2.5,
    co2Threshold: 95,
    notes: "Excise and eco tax depend on age and emissions",
  },
  portugal: {
    customsDuty: 10,
    vatRate: 23,
    exciseBase: 3.0,
    co2Threshold: 95,
    notes: "CO₂-based vehicle tax and excise",
  },
  romania: {
    customsDuty: 10,
    vatRate: 19,
    exciseBase: 2.0,
    co2Threshold: 95,
    notes: "Excise and green tax apply",
  },
  slovakia: {
    customsDuty: 10,
    vatRate: 20,
    exciseBase: 2.2,
    co2Threshold: 95,
    notes: "Excise based on engine and emissions",
  },
  slovenia: {
    customsDuty: 10,
    vatRate: 22,
    exciseBase: 2.5,
    co2Threshold: 95,
    notes: "CO₂ tax applied",
  },
  spain: {
    customsDuty: 10,
    vatRate: 21,
    exciseBase: 2.8,
    co2Threshold: 95,
    notes: "Registration tax based on CO₂",
  },
  sweden: {
    customsDuty: 10,
    vatRate: 25,
    exciseBase: 3.5,
    co2Threshold: 95,
    notes: "Bonus-malus system with CO₂ tax",
  },
}

interface CalculationResult {
  customsDuty: number
  exciseTax: number
  vat: number
  tariffSurcharge: number
  totalCost: number
  breakdown: {
    carValue: number
    customsDuty: number
    exciseTax: number
    subtotal: number
    vat: number
    tariffSurcharge: number
    total: number
  }
}

export default function CarImportCalculator() {
  const [country, setCountry] = useState<string>("")
  const [carValue, setCarValue] = useState<string>("")
  const [co2Emissions, setCo2Emissions] = useState<string>("")
  const [carMake, setCarMake] = useState<string>("")
  const [carModel, setCarModel] = useState<string>("")
  const [yearOfManufacture, setYearOfManufacture] = useState<string>("")
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateFees = () => {
    if (!country || !carValue || !co2Emissions || !carMake || !carModel || !yearOfManufacture) {
      alert("Please fill in all fields")
      return
    }

    setIsCalculating(true)

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const data = countryData[country]
      const value = Number.parseFloat(carValue)
      const co2 = Number.parseFloat(co2Emissions)

      // Calculate customs duty
      const customsDuty = (value * data.customsDuty) / 100

      // Calculate excise tax based on CO₂ emissions
      let exciseTax = 0
      if (co2 > data.co2Threshold) {
        const excessCo2 = co2 - data.co2Threshold
        exciseTax = excessCo2 * data.exciseBase
      }

      // Calculate subtotal before VAT
      const subtotal = value + customsDuty + exciseTax

      // Calculate VAT on subtotal
      const vat = (subtotal * data.vatRate) / 100

      // Tariff surcharge (simplified - could be more complex based on country)
      const tariffSurcharge = country === "generic-eu" ? subtotal * 0.005 : 0

      // Total cost
      const totalCost = subtotal + vat + tariffSurcharge

      const calculationResult: CalculationResult = {
        customsDuty,
        exciseTax,
        vat,
        tariffSurcharge,
        totalCost,
        breakdown: {
          carValue: value,
          customsDuty,
          exciseTax,
          subtotal,
          vat,
          tariffSurcharge,
          total: totalCost,
        },
      }

      setResult(calculationResult)
      setIsCalculating(false)
    }, 500)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Car className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AUTOIMPORT.APP</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The easiest way to calculate customs duties, VAT, and excise taxes for importing cars into European
            countries!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Import Details
              </CardTitle>
              <CardDescription>Enter your car details to calculate import fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="country">Select Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose destination country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50">European Union</div>
                    <SelectItem value="austria">Austria</SelectItem>
                    <SelectItem value="belgium">Belgium</SelectItem>
                    <SelectItem value="bulgaria">Bulgaria</SelectItem>
                    <SelectItem value="croatia">Croatia</SelectItem>
                    <SelectItem value="cyprus">Cyprus</SelectItem>
                    <SelectItem value="czechia">Czechia</SelectItem>
                    <SelectItem value="denmark">Denmark</SelectItem>
                    <SelectItem value="estonia">Estonia</SelectItem>
                    <SelectItem value="finland">Finland</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="greece">Greece</SelectItem>
                    <SelectItem value="hungary">Hungary</SelectItem>
                    <SelectItem value="ireland">Ireland</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="latvia">Latvia</SelectItem>
                    <SelectItem value="lithuania">Lithuania</SelectItem>
                    <SelectItem value="luxembourg">Luxembourg</SelectItem>
                    <SelectItem value="malta">Malta</SelectItem>
                    <SelectItem value="netherlands">Netherlands</SelectItem>
                    <SelectItem value="poland">Poland</SelectItem>
                    <SelectItem value="portugal">Portugal</SelectItem>
                    <SelectItem value="romania">Romania</SelectItem>
                    <SelectItem value="slovakia">Slovakia</SelectItem>
                    <SelectItem value="slovenia">Slovenia</SelectItem>
                    <SelectItem value="spain">Spain</SelectItem>
                    <SelectItem value="sweden">Sweden</SelectItem>

                    <div className="px-2 py-1.5 text-sm font-semibold text-gray-900 bg-gray-50 mt-2">
                      Non-EU Countries
                    </div>
                    <SelectItem value="albania">Albania</SelectItem>
                    <SelectItem value="bosnia-herzegovina">Bosnia & Herzegovina</SelectItem>
                    <SelectItem value="kosovo">Kosovo</SelectItem>
                    <SelectItem value="montenegro">Montenegro</SelectItem>
                    <SelectItem value="north-macedonia">North Macedonia</SelectItem>
                    <SelectItem value="serbia">Serbia</SelectItem>
                    <SelectItem value="ukraine">Ukraine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carValue">Car Value (CIF) in EUR</Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="carValue"
                    type="number"
                    placeholder="25000"
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                    className="pl-10"
                    min="0"
                    step="100"
                  />
                </div>
                <p className="text-sm text-gray-500">Cost, Insurance, and Freight value</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="co2Emissions">CO₂ Emissions (g/km)</Label>
                <Input
                  id="co2Emissions"
                  type="number"
                  placeholder="120"
                  value={co2Emissions}
                  onChange={(e) => setCo2Emissions(e.target.value)}
                  min="0"
                  max="500"
                />
                <p className="text-sm text-gray-500">
                  Enter the official WLTP CO₂ emissions (g/km). You can find this in your{" "}
                  <strong>vehicle registration document</strong> or with a simple <strong>Google search</strong>!
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carMake">Car Make</Label>
                <Input
                  id="carMake"
                  type="text"
                  placeholder="e.g., BMW, Mercedes, Audi"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                />
                <p className="text-sm text-gray-500">Enter the manufacturer/brand of the car</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="carModel">Car Model</Label>
                <Input
                  id="carModel"
                  type="text"
                  placeholder="e.g., 320d, C-Class, A4"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
                <p className="text-sm text-gray-500">Enter the specific model of the car</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearOfManufacture">Year of Manufacture</Label>
                <Select value={yearOfManufacture} onValueChange={setYearOfManufacture}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {Array.from({ length: 26 }, (_, i) => 2025 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Select the year the car was manufactured</p>
              </div>

              <Button onClick={calculateFees} className="w-full" size="lg" disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Import Fees
                  </>
                )}
              </Button>

              {country && countryData[country] && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> {countryData[country].notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Import Cost Breakdown</CardTitle>
              <CardDescription>
                {result ? "Detailed fee calculation" : "Results will appear here after calculation"}
              </CardDescription>
              {result && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Vehicle Information</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>
                      <strong>Make:</strong> {carMake}
                    </p>
                    <p>
                      <strong>Model:</strong> {carModel}
                    </p>
                    <p>
                      <strong>Year:</strong> {yearOfManufacture}
                    </p>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Car Value (CIF)</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.carValue)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Customs Duty</span>
                      <span className="font-medium text-orange-600">
                        {formatCurrency(result.breakdown.customsDuty)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Excise / Eco Tax</span>
                      <span className="font-medium text-green-600">{formatCurrency(result.breakdown.exciseTax)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatCurrency(result.breakdown.subtotal)}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">VAT</span>
                      <span className="font-medium text-blue-600">{formatCurrency(result.breakdown.vat)}</span>
                    </div>

                    {result.breakdown.tariffSurcharge > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Tariff Surcharge</span>
                        <span className="font-medium text-purple-600">
                          {formatCurrency(result.breakdown.tariffSurcharge)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Import Cost</span>
                      <span className="text-2xl font-bold text-red-600">{formatCurrency(result.breakdown.total)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Additional cost: {formatCurrency(result.breakdown.total - result.breakdown.carValue)}</p>
                      <p>
                        • Total as % of car value:{" "}
                        {((result.breakdown.total / result.breakdown.carValue) * 100).toFixed(1)}%
                      </p>
                      <p>
                        • Import fees:{" "}
                        {(
                          ((result.breakdown.total - result.breakdown.carValue) / result.breakdown.carValue) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your car details and click calculate to see the import cost breakdown</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            * This calculator provides estimates based on standard rates. Actual fees may vary depending on specific
            circumstances, car age, engine size, and current regulations. Always consult with customs authorities for
            official calculations.
          </p>
        </div>
      </div>
    </div>
  )
}
