let currentId = 0;
let movies = [];

$("#new-movie-form").on("submit", function (e) {
  e.preventDefault();
  const title = $("#title").val();
  const rate = $("#rating").val();

  movie = { title, rate, id: currentId };

  const movieData = createMovieData(movie);

  currentId++;
  movies.push(movie);

  $("#movie-table-body").append(movieData);
  $("#new-movie-form").trigger("reset");
});

function createMovieData(data) {
  return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rate}</td>
        <td>
        <button class="btn btn-danger" data-delete-id=${data.id}>Delete</button></td>
    </tr>
    `;
}

$("tbody").on("click", ".btn.btn-danger", function (evt) {
  console.log($(evt.target).data("delete-id"));
  const index = movies.findIndex(
    (movie) => movie.id === $(evt.target).data("delete-id")
  );

  movies.splice(index, 1);

  $(evt.target).closest("tr").remove();
});

$(".fas").on("click", function (evt) {
  let keyToSortBy = $(evt.target).attr("id");
  let sortedMovies = sortBy(movies, keyToSortBy);

  $("#movie-table-body").empty();

  for (const movie of sortedMovies) {
    const HTMLtoAppend = createMovieData(movie);
    $("#movie-table-body").append(HTMLtoAppend);
  }
});

function sortBy(array, keySortBy) {
  return array.sort(function (a, b) {
    if (keySortBy === "rating") {
      keySortBy = "rate";
    }

    return a[keySortBy].localeCompare(b[keySortBy]);
  });
}
