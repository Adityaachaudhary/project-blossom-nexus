import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects, setTechFilter, setStatusFilter } from "@/store/projectsSlice";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { projects, status, error, filters } = useAppSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [budgetRange, setBudgetRange] = useState<[number, number]>([0, 100000]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  // Extract all unique tech stacks for filtering
  const allTechStacks = Array.from(
    new Set(projects.flatMap((project) => project.techStack))
  ).sort();

  // Apply client-side filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = filters.tech ? project.techStack.includes(filters.tech) : true;
    const matchesStatus = filters.status === "ALL" ? true : project.status === filters.status;
    const matchesBudget = project.budget >= budgetRange[0] && project.budget <= budgetRange[1];
    
    return matchesSearch && matchesTech && matchesStatus && matchesBudget;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    dispatch(setTechFilter(null));
    dispatch(setStatusFilter("ALL"));
    setBudgetRange([0, 100000]);
  };

  const getMaxBudget = () => {
    if (projects.length === 0) return 100000;
    return Math.max(...projects.map(p => p.budget));
  };

  if (status === "loading" && projects.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <Button onClick={() => dispatch(fetchProjects())} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          {/* Search */}
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden w-full">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filter Projects</SheetTitle>
                  <SheetDescription>
                    Narrow down projects by tech stack, budget, and status
                  </SheetDescription>
                </SheetHeader>
                
                  {/* Tech Stack Filter (Mobile) */}
                  <div className="space-y-2">
                    <Label>Tech Stack</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={filters.tech === null ? "default" : "outline"}
                        onClick={() => dispatch(setTechFilter(null))}
                      >
                        All Technologies
                      </Button>
                      {allTechStacks.map((tech) => (
                        <Button
                          key={tech}
                          size="sm"
                          variant={filters.tech === tech ? "default" : "outline"}
                          onClick={() => dispatch(setTechFilter(tech === filters.tech ? null : tech))}
                        >
                          {tech}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Budget Range (Mobile) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Budget Range (₹)</Label>
                      <span className="text-sm">
                        ₹{budgetRange[0].toLocaleString()} - ₹{budgetRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, getMaxBudget()]}
                      max={getMaxBudget()}
                      step={1000}
                      value={budgetRange}
                      onValueChange={(value) => setBudgetRange(value as [number, number])}
                    />
                  </div>
                  
                  {/* Status Filter (Mobile) */}
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={filters.status === "ALL" ? "default" : "outline"}
                        onClick={() => dispatch(setStatusFilter("ALL"))}
                      >
                        All Status
                      </Button>
                      <Button
                        size="sm"
                        variant={filters.status === "OPEN" ? "default" : "outline"}
                        onClick={() => dispatch(setStatusFilter("OPEN"))}
                      >
                        Open
                      </Button>
                      <Button
                        size="sm"
                        variant={filters.status === "COMPLETED" ? "default" : "outline"}
                        onClick={() => dispatch(setStatusFilter("COMPLETED"))}
                      >
                        Completed
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleClearFilters} variant="outline" className="w-full">
                      Clear Filters
                    </Button>
                    <SheetClose asChild>
                      <Button className="w-full">Apply Filters</Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Desktop Filters */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            {/* Tech Stack Filter */}
            <div>
              <Label className="mb-2 block">Tech Stack</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={filters.tech === null ? "default" : "outline"}
                  onClick={() => dispatch(setTechFilter(null))}
                >
                  All Technologies
                </Button>
                {allTechStacks.slice(0, 5).map((tech) => (
                  <Button
                    key={tech}
                    size="sm"
                    variant={filters.tech === tech ? "default" : "outline"}
                    onClick={() => dispatch(setTechFilter(tech === filters.tech ? null : tech))}
                  >
                    {tech}
                  </Button>
                ))}
                {allTechStacks.length > 5 && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="sm" variant="outline">
                        +{allTechStacks.length - 5} more
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Select Technology</SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {allTechStacks.map((tech) => (
                          <Button
                            key={tech}
                            size="sm"
                            variant={filters.tech === tech ? "default" : "outline"}
                            onClick={() => {
                              dispatch(setTechFilter(tech === filters.tech ? null : tech));
                            }}
                          >
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
            
            {/* Budget Range */}
            <div>
              <div className="flex items-center justify-between">
                <Label>Budget Range (₹)</Label>
                <span className="text-sm">
                  ₹{budgetRange[0].toLocaleString()} - ₹{budgetRange[1].toLocaleString()}
                </span>
              </div>
              <Slider
                className="mt-2"
                defaultValue={[0, getMaxBudget()]}
                max={getMaxBudget()}
                step={1000}
                value={budgetRange}
                onValueChange={(value) => setBudgetRange(value as [number, number])}
              />
            </div>
            
            {/* Status Filter */}
            <div>
              <Label className="mb-2 block">Status</Label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={filters.status === "ALL" ? "default" : "outline"}
                  onClick={() => dispatch(setStatusFilter("ALL"))}
                >
                  All Status
                </Button>
                <Button
                  size="sm"
                  variant={filters.status === "OPEN" ? "default" : "outline"}
                  onClick={() => dispatch(setStatusFilter("OPEN"))}
                >
                  Open
                </Button>
                <Button
                  size="sm"
                  variant={filters.status === "COMPLETED" ? "default" : "outline"}
                  onClick={() => dispatch(setStatusFilter("COMPLETED"))}
                >
                  Completed
                </Button>
              </div>
            </div>
          </div>
          
          {/* Clear Filters */}
          {(filters.tech !== null || filters.status !== "ALL" || 
              budgetRange[0] > 0 || budgetRange[1] < getMaxBudget() || searchTerm) && (
            <div className="mt-4 flex justify-end">
              <Button 
                variant="ghost"
                size="sm" 
                onClick={handleClearFilters}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
            alt="No projects found" 
            className="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
          />
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Button onClick={handleClearFilters}>Clear all filters</Button>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProjectList;
