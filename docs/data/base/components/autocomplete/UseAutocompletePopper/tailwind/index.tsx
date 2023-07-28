import * as React from 'react';
import useAutocomplete, { UseAutocompleteProps } from '@mui/base/useAutocomplete';
import Popper from '@mui/base/Popper';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import clsx from 'clsx';

const CustomAutocomplete = React.forwardRef(function CustomAutocomplete(
  props: UseAutocompleteProps<(typeof top100Films)[number], false, false, false>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    popupOpen,
    anchorEl,
    setAnchorEl,
  } = useAutocomplete(props);

  const rootRef = useForkRef(ref, setAnchorEl);

  return (
    <div className="relative my-6 mx-0 w-80">
      <div
        {...getRootProps()}
        ref={rootRef}
        className={clsx(
          'flex gap-[5px] pr-[5px] overflow-hidden w-full rounded-lg bg-white dark:bg-slate-800 border border-solid border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-400 focus-visible:outline-0',
          !focused &&
            'shadow-[0_2px_2px_transparent] shadow-slate-50 dark:shadow-slate-900',
          focused &&
            'border-purple-400 dark:border-purple-400 shadow-outline-purple',
        )}
      >
        <input
          {...getInputProps()}
          className="text-sm leading-[1.5] text-slate-900 dark:text-slate-300 bg-inherit border-0 rounded-[inherit] px-3 py-2 outline-0 grow shrink-0 basis-auto"
        />
      </div>
      {anchorEl && (
        <Popper
          open={popupOpen}
          anchorEl={anchorEl}
          slotProps={{
            root: {
              className: 'relative z-[1001] w-80',
            },
          }}
        >
          {groupedOptions.length > 0 ? (
            <ul
              {...getListboxProps()}
              className="text-sm box-border p-1.5 my-3 mx-0 w-full rounded-xl overflow-auto outline-0 max-h-[300px] z-[1] absolute inset-x-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 shadow shadow-slate-200 dark:shadow-slate-900"
            >
              {(groupedOptions as typeof top100Films).map((option, index) => (
                <li
                  {...getOptionProps({ option, index })}
                  className="list-none p-2 rounded-lg cursor-default last-of-type:border-b-0 hover:cursor-pointer aria-selected:bg-purple-100 dark:aria-selected:bg-purple-900 aria-selected:text-purple-900 dark:aria-selected:text-purple-100 ui-focused:bg-slate-100 dark:ui-focused:bg-slate-700 ui-focus-visible:bg-slate-100 dark:ui-focus-visible:bg-slate-800 ui-focused:text-slate-900 dark:ui-focused:text-slate-300 ui-focus-visible:text-slate-900 dark:ui-focus-visible:text-slate-300 ui-focus-visible:shadow-[0_0_0_3px_transparent] ui-focus-visible:shadow-purple-200 dark:ui-focus-visible:shadow-purple-500 ui-focused:aria-selected:bg-purple-100 dark:ui-focused:aria-selected:bg-purple-900 ui-focus-visible:aria-selected:bg-purple-100 dark:ui-focus-visible:aria-selected:bg-purple-900 ui-focused:aria-selected:text-purple-900 dark:ui-focused:aria-selected:text-purple-100 ui-focus-visible:aria-selected:text-purple-900 dark:ui-focus-visible:aria-selected:text-purple-100"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <li className="list-none p-2 cursor-default">No results</li>
          )}
        </Popper>
      )}
    </div>
  );
});

export default function UseAutocompletePopper() {
  const [value, setValue] = React.useState<(typeof top100Films)[number] | null>(
    null,
  );

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: (typeof top100Films)[number] | null,
  ) => setValue(newValue);

  return (
    <CustomAutocomplete
      options={top100Films}
      value={value}
      onChange={handleChange}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
