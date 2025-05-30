"use client";

import { useState } from "react";
import { Star, ChevronDown, ChevronRight, Calendar, BarChart3, Clock9, Home, Plane as Planet } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Sample placeholder data
const planets = [
  { planet: "Sun", sign: "Aries", house: 1, degree: "15° 23'", retrograde: false },
  { planet: "Moon", sign: "Taurus", house: 2, degree: "8° 45'", retrograde: false },
  { planet: "Mercury", sign: "Pisces", house: 12, degree: "2° 18'", retrograde: true },
  { planet: "Venus", sign: "Aquarius", house: 11, degree: "25° 07'", retrograde: false },
  { planet: "Mars", sign: "Capricorn", house: 10, degree: "19° 34'", retrograde: false },
  { planet: "Jupiter", sign: "Leo", house: 5, degree: "11° 42'", retrograde: false },
  { planet: "Saturn", sign: "Scorpio", house: 8, degree: "28° 56'", retrograde: true },
  { planet: "Rahu", sign: "Virgo", house: 6, degree: "3° 12'", retrograde: false },
  { planet: "Ketu", sign: "Pisces", house: 12, degree: "3° 12'", retrograde: false },
];

const houses = [
  { house: 1, sign: "Aries", planets: ["Sun"] },
  { house: 2, sign: "Taurus", planets: ["Moon"] },
  { house: 3, sign: "Gemini", planets: [] },
  { house: 4, sign: "Cancer", planets: [] },
  { house: 5, sign: "Leo", planets: ["Jupiter"] },
  { house: 6, sign: "Virgo", planets: ["Rahu"] },
  { house: 7, sign: "Libra", planets: [] },
  { house: 8, sign: "Scorpio", planets: ["Saturn"] },
  { house: 9, sign: "Sagittarius", planets: [] },
  { house: 10, sign: "Capricorn", planets: ["Mars"] },
  { house: 11, sign: "Aquarius", planets: ["Venus"] },
  { house: 12, sign: "Pisces", planets: ["Mercury", "Ketu"] },
];

const dashas = [
  { 
    period: "Ketu Mahadasha", 
    startDate: "Jan 2020", 
    endDate: "Jan 2027", 
    description: "A period of spiritual growth and introspection. There may be sudden changes and detachments from material desires. Good for meditation and inner work." 
  },
  { 
    period: "Venus Mahadasha", 
    startDate: "Jan 2027", 
    endDate: "Jan 2047", 
    description: "A period focused on relationships, creativity, and comforts. Favorable for marriage, arts, and financial growth if Venus is well-placed in the chart." 
  },
  { 
    period: "Sun Mahadasha", 
    startDate: "Jan 2047", 
    endDate: "Jan 2053", 
    description: "A period highlighting leadership, authority, and self-identity. May bring recognition, career advancement, and improved relationship with father figures." 
  },
];

interface KundaliResultsProps {
  formData: {
    name: string;
    date: Date | undefined;
    place: string;
    timezone: string;
    [key: string]: any;
  };
  kundaliData: any; // Real API response data
}

const KundaliResults = ({ formData, kundaliData }: KundaliResultsProps) => {
  // Process API data
  const planets = kundaliData?.planets || [];
  const lagna = kundaliData?.lagna || {};
  const panchanga = kundaliData?.panchanga || {};
  const dashas = kundaliData?.dashas || [];
  
  // Define zodiac signs array
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  // Calculate houses based on lagna sign index
  const calculateHousePositions = () => {
    const houses = [];
    const lagnaSignIndex = lagna.sign_index || 0;
    
    for (let houseNum = 1; houseNum <= 12; houseNum++) {
      const signIndex = (lagnaSignIndex + houseNum - 1) % 12;
      const signName = zodiacSigns[signIndex];
      const planetsInHouse = planets.filter((planet: any) => {
        const planetHouse = ((planet.sign_index - lagnaSignIndex + 12) % 12) + 1;
        return planetHouse === houseNum;
      }).map((planet: any) => planet.planet);
      
      houses.push({
        house: houseNum,
        sign: signName,
        planets: planetsInHouse
      });
    }
    return houses;
  };

  const houses = calculateHousePositions();

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          <Star className="mb-2 inline-block h-6 w-6 text-amber-500" />
          <span className="ml-2">Kundali Analysis</span>
        </h2>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Birth Date</p>
              <p className="text-sm text-muted-foreground">
                {formData.date ? formData.date.toLocaleDateString() : "Not specified"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3">
            <Clock9 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Birth Time</p>
              <p className="text-sm text-muted-foreground">{formData.time || "Not specified"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3">
            <Home className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Birth Place</p>
              <p className="text-sm text-muted-foreground">{formData.place || "Not specified"}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="planets">Planets</TabsTrigger>
            <TabsTrigger value="houses">Houses</TabsTrigger>
            <TabsTrigger value="dashas">Dashas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-amber-500" />
                  Personal Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Lagna Information */}
                  <div className="rounded-md bg-muted/50 p-4">
                    <h4 className="font-semibold mb-2">Ascendant (Lagna)</h4>
                    <p className="text-sm text-muted-foreground">
                      <strong>Sign:</strong> {lagna.sign || "Not available"} ({lagna.longitude_within_sign?.toFixed(2)}°)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Nakshatra:</strong> {lagna.nakshatra || "Not available"} (Pada {lagna.pada || "?"})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Navamsa Lagna:</strong> {kundaliData?.navamsa_lagna?.sign || "Not available"}
                    </p>
                  </div>

                  {/* Panchanga Information */}
                  {panchanga && (
                    <div className="rounded-md bg-muted/50 p-4">
                      <h4 className="font-semibold mb-2">Panchanga Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><strong>Tithi:</strong> {panchanga.tithi || "N/A"}</p>
                        <p><strong>Paksha:</strong> {panchanga.paksha || "N/A"}</p>
                        <p><strong>Yoga:</strong> {panchanga.yoga || "N/A"}</p>
                        <p><strong>Karana:</strong> {panchanga.karana || "N/A"}</p>
                        <p><strong>Gana:</strong> {panchanga.gana || "N/A"}</p>
                        <p><strong>Nadi:</strong> {panchanga.nadi || "N/A"}</p>
                        <p><strong>Varna:</strong> {panchanga.varna || "N/A"}</p>
                        <p><strong>Yoni:</strong> {panchanga.yoni || "N/A"}</p>
                      </div>
                    </div>
                  )}

                  {/* General interpretation */}
                  <p className="text-muted-foreground">
                    Your birth chart has been calculated using traditional Vedic astrology principles with the Lahiri Ayanamsa. 
                    The planetary positions and aspects in your chart reveal unique patterns that influence your personality, 
                    life path, and potential experiences.
                  </p>
                </div>
              </CardContent>
            </Card>

            {formData.showChart && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Planet className="mr-2 h-5 w-5 text-amber-500" />
                    Kundali Chart
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-square w-full max-w-[400px] mx-auto rounded-md border">
                    <div className="grid h-full w-full grid-cols-3 grid-rows-3 absolute">
                      <div className="border border-border"></div>
                      <div className="border border-border">{houses[0].planets.join(", ")}</div>
                      <div className="border border-border">{houses[1].planets.join(", ")}</div>
                      <div className="border border-border">{houses[11].planets.join(", ")}</div>
                      <div className="border border-border flex items-center justify-center text-xs text-muted-foreground">
                        Chart Placeholder
                      </div>
                      <div className="border border-border">{houses[2].planets.join(", ")}</div>
                      <div className="border border-border">{houses[10].planets.join(", ")}</div>
                      <div className="border border-border">{houses[9].planets.join(", ")}</div>
                      <div className="border border-border">{houses[3].planets.join(", ")}</div>
                    </div>
                    <div className="grid h-full w-full grid-cols-4 grid-rows-4 absolute">
                      <div className="col-start-2 col-span-2 row-start-2 row-span-2 border border-dashed border-muted-foreground flex items-center justify-center">
                        {formData.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="planets">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Planet className="mr-2 h-5 w-5 text-amber-500" />
                  Planetary Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Planet</TableHead>
                      <TableHead>Sign</TableHead>
                      <TableHead>Degree</TableHead>
                      <TableHead>Nakshatra</TableHead>
                      <TableHead>Pada</TableHead>
                      <TableHead>Navamsa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planets.map((planet: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {planet.planet || "Unknown"}
                        </TableCell>
                        <TableCell>{planet.sign || "N/A"}</TableCell>
                        <TableCell>{planet.longitude_within_sign?.toFixed(2)}°</TableCell>
                        <TableCell>{planet.nakshatra || "N/A"}</TableCell>
                        <TableCell>{planet.pada || "N/A"}</TableCell>
                        <TableCell>{planet.navamsa_sign || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="houses">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="mr-2 h-5 w-5 text-amber-500" />
                  House Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>House</TableHead>
                      <TableHead>Sign</TableHead>
                      <TableHead>Planets</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {houses.map((house, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {house.house}
                        </TableCell>
                        <TableCell>{house.sign}</TableCell>
                        <TableCell>
                          {house.planets.length ? house.planets.join(", ") : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="dashas">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-amber-500" />
                  Dasha Periods
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashas.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {dashas.map((dasha: any, index: number) => {
                      const startDate = new Date(dasha.start).toLocaleDateString();
                      const endDate = new Date(dasha.end).toLocaleDateString();
                      
                      return (
                        <AccordionItem key={index} value={`dasha-${index}`}>
                          <AccordionTrigger>
                            <div className="flex items-center text-left">
                              <span className="font-medium">{dasha.planet} Mahadasha</span>
                              <span className="ml-4 text-sm text-muted-foreground">
                                {startDate} - {endDate}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              <p className="text-muted-foreground">
                                Duration: {startDate} to {endDate}
                              </p>
                              {dasha.antardashas && dasha.antardashas.length > 0 && (
                                <div>
                                  <h5 className="font-medium mb-2">Antardashas (Sub-periods):</h5>
                                  <div className="space-y-1">
                                    {dasha.antardashas.slice(0, 5).map((antardasha: any, adIndex: number) => {
                                      const adStart = new Date(antardasha.start).toLocaleDateString();
                                      const adEnd = new Date(antardasha.end).toLocaleDateString();
                                      return (
                                        <p key={adIndex} className="text-sm text-muted-foreground pl-4">
                                          {antardasha.planet}: {adStart} - {adEnd}
                                        </p>
                                      );
                                    })}
                                    {dasha.antardashas.length > 5 && (
                                      <p className="text-sm text-muted-foreground pl-4">
                                        ... and {dasha.antardashas.length - 5} more
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground">Dasha information not available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KundaliResults;