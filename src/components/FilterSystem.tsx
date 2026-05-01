import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSystemProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterSystem = ({
  filters,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: FilterSystemProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
      {/* Search Bar */}
      <div className="relative w-full md:w-96">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search activities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 neu-pressed rounded-full focus:outline-none text-foreground transition-all placeholder:text-muted-foreground/70"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
              activeFilter === filter
                ? "neu-pressed text-foreground"
                : "neu-button text-muted-foreground hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSystem;
